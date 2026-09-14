import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageEnhance

W, H = 1080, 585
OUT_DIR = "public/projects/nova"
os.makedirs(OUT_DIR, exist_ok=True)

FONTS_DIR = os.path.join(os.environ.get("WINDIR", "C:\\Windows"), "Fonts")

def get_font(name, size):
    try:
        return ImageFont.truetype(os.path.join(FONTS_DIR, name), size)
    except Exception:
        return ImageFont.load_default()

font_title = get_font("segoeuib.ttf", 26)
font_subtitle = get_font("segoeui.ttf", 15)
font_mono = get_font("consolab.ttf", 13)
font_mono_sm = get_font("consola.ttf", 11)
font_badge = get_font("consolab.ttf", 11)

bg_raw = Image.open("e:/projects/repos/nova/web/images/bg.webp").convert("RGBA")
logo_raw = Image.open("e:/projects/repos/nova/web/images/logo.webp").convert("RGBA")

def create_base(title_text, subtitle_text, route_text, tag_color=(0, 229, 255)):
    # 1. Base background
    # Resize bg to cover
    bg = bg_raw.resize((W, H))
    enhancer = ImageEnhance.Brightness(bg)
    bg = enhancer.enhance(0.22)
    bg = bg.filter(ImageFilter.GaussianBlur(radius=3))

    overlay = Image.new("RGBA", (W, H), (7, 11, 20, 210))
    img = Image.alpha_composite(bg, overlay)
    draw = ImageDraw.Draw(img)

    # Grid lines
    for x in range(0, W, 45):
        draw.line([(x, 0), (x, H)], fill=(255, 255, 255, 8), width=1)
    for y in range(0, H, 45):
        draw.line([(0, y), (W, y)], fill=(255, 255, 255, 8), width=1)

    # Outer border & HUD corners
    border_col = (40, 56, 85, 200)
    draw.rectangle([18, 18, W - 18, H - 18], outline=border_col, width=1)
    
    # Corner brackets
    c_len = 16
    for cx, cy in [(18, 18), (W - 18, 18), (18, H - 18), (W - 18, H - 18)]:
        dx = c_len if cx == 18 else -c_len
        dy = c_len if cy == 18 else -c_len
        draw.line([(cx, cy), (cx + dx, cy)], fill=tag_color + (255,), width=2)
        draw.line([(cx, cy), (cx, cy + dy)], fill=tag_color + (255,), width=2)

    # Header Bar
    draw.rectangle([19, 19, W - 19, 68], fill=(12, 18, 32, 230))
    draw.line([19, 68, W - 19, 68], fill=(35, 48, 72, 255), width=1)

    # Small Logo in header
    logo_sm = logo_raw.resize((36, 36), Image.Resampling.LANCZOS)
    img.paste(logo_sm, (32, 25), logo_sm)

    # Title in header
    draw.text((80, 27), "NOVA PLATFORM", font=font_title, fill=(240, 246, 252))
    draw.text((310, 36), f"// {route_text}", font=font_mono, fill=tag_color)

    # Right telemetry tags
    tag_bg = (18, 28, 48, 220)
    draw.rounded_rectangle([W - 270, 28, W - 32, 58], radius=4, fill=tag_bg, outline=(38, 58, 92))
    draw.text((W - 258, 35), "● SYSTEM ONLINE  •  FASTAPI / REDIS", font=font_mono_sm, fill=(56, 189, 248))

    # Bottom status bar
    draw.rectangle([19, H - 38, W - 19, H - 19], fill=(10, 15, 26, 240))
    draw.line([19, H - 38, W - 19, H - 38], fill=(30, 42, 65, 255), width=1)
    draw.text((32, H - 33), "LATENCY: 12ms  |  POSTGRESQL 16: CONNECTED  |  ALEMBIC: v1.13.1  |  WORKERS: 8 ACTIVE", font=font_mono_sm, fill=(130, 150, 180))
    draw.text((W - 240, H - 33), "[ PREVIEW PLACEHOLDER ]", font=font_badge, fill=tag_color)

    return img, draw

def generate_dashboard():
    img, draw = create_base("Web Dashboard & Feed Management", "Server Overview & Analytics", "SYS.VIEW: /dashboard", (0, 229, 255))

    # Left Sidebar
    draw.rounded_rectangle([32, 82, 220, H - 52], radius=6, fill=(12, 18, 30, 220), outline=(28, 42, 64))
    draw.text((46, 96), "NAVIGATION", font=font_mono_sm, fill=(100, 125, 160))

    nav_items = [
        ("Dashboard", True),
        ("Active Feeds", False),
        ("Channel Routing", False),
        ("Discord Guilds", False),
        ("Role Mentions", False),
        ("Rate Limiter", False),
        ("Audit Logs", False),
        ("API Tokens", False),
    ]
    for i, (item, active) in enumerate(nav_items):
        y = 125 + i * 36
        if active:
            draw.rounded_rectangle([42, y - 6, 210, y + 24], radius=4, fill=(0, 229, 255, 35), outline=(0, 229, 255, 120))
            draw.text((54, y), f"> {item}", font=font_subtitle, fill=(0, 229, 255))
        else:
            draw.text((54, y), f"  {item}", font=font_subtitle, fill=(160, 175, 200))

    # Right Content Area: 3 Metric Cards
    metrics = [
        ("TOTAL FEEDS MONITORED", "128", "+14% this month", (56, 189, 248)),
        ("DISPATCHED EVENTS / 24H", "4,892", "99.98% delivery rate", (168, 85, 247)),
        ("AVG POLLING LATENCY", "18.4s", "sub-minute SLA", (34, 197, 94)),
    ]
    card_w = 250
    for i, (title, val, sub, col) in enumerate(metrics):
        x = 240 + i * (card_w + 15)
        draw.rounded_rectangle([x, 82, x + card_w, 175], radius=6, fill=(12, 18, 30, 220), outline=(32, 48, 75))
        draw.text((x + 16, 96), title, font=font_mono_sm, fill=(120, 140, 170))
        draw.text((x + 16, 118), val, font=font_title, fill=col)
        draw.text((x + 16, 150), sub, font=font_mono_sm, fill=(160, 180, 210))

    # Main Chart / Table Card
    draw.rounded_rectangle([240, 190, W - 32, H - 52], radius=6, fill=(12, 18, 30, 220), outline=(32, 48, 75))
    draw.text((256, 204), "RECENT INGESTION PIPELINE ACTIVITY", font=font_mono, fill=(240, 246, 252))

    table_headers = ["SOURCE", "FEED TARGET", "DISCORD CHANNEL", "STATUS", "TIMESTAMP"]
    tx_pos = [256, 380, 580, 800, 930]
    for h, pos in zip(table_headers, tx_pos):
        draw.text((pos, 232), h, font=font_mono_sm, fill=(100, 120, 150))
    draw.line([256, 250, W - 48, 250], fill=(25, 38, 60), width=1)

    rows = [
        ("YouTube API", "@LinusTechTips (Video Upload)", "#tech-news", "DISPATCHED", "14:42:18"),
        ("Twitch Webhook", "twitch.tv/shroud (Live Stream)", "#streams", "DISPATCHED", "14:40:02"),
        ("Steam Store", "Discounts & Free Weekends", "#deals", "QUEUED (REDIS)", "14:38:45"),
        ("GitHub Release", "stargate91/discord-feed-bot", "#dev-alerts", "DISPATCHED", "14:35:10"),
        ("CoinGecko API", "BTC/USD & ETH/USD Price Alert", "#crypto-ticker", "DISPATCHED", "14:31:00"),
        ("Reddit RSS", "r/selfhosted Announcements", "#community-feed", "DISPATCHED", "14:28:12"),
    ]
    for r_idx, (src, feed, ch, st, tm) in enumerate(rows):
        ry = 262 + r_idx * 38
        st_color = (34, 197, 94) if "DISPATCHED" in st else (234, 179, 8)
        draw.text((tx_pos[0], ry), src, font=font_subtitle, fill=(220, 230, 245))
        draw.text((tx_pos[1], ry), feed, font=font_mono_sm, fill=(170, 185, 210))
        draw.text((tx_pos[2], ry), ch, font=font_mono_sm, fill=(140, 170, 240))
        draw.text((tx_pos[3], ry), f"● {st}", font=font_mono_sm, fill=st_color)
        draw.text((tx_pos[4], ry), tm, font=font_mono_sm, fill=(120, 140, 170))

    img.convert("RGB").save(f"{OUT_DIR}/dashboard.webp", "WEBP", quality=90)
    print("Saved dashboard.webp")

def generate_feeds():
    img, draw = create_base("Multi-Provider Ingestion & Channel Routing", "Feed Monitors & Polling Engine", "SYS.VIEW: /feeds/monitors", (168, 85, 247))

    providers = [
        ("YouTube Hub", "Polling Worker (PubSubHubbub + API v3)", "8 Channels Active", "15s Interval", (239, 68, 68)),
        ("Twitch Gateway", "EventSub WebSocket & Polling Fallback", "12 Streamers Tracked", "Live Push", (168, 85, 247)),
        ("Steam & Epic", "Storefront Deals, Free Games & News", "Global Catalog Watcher", "5m Interval", (59, 130, 246)),
        ("GitHub Releases", "Repository Releases, Tags & Issues", "24 Repositories Watch", "30s Interval", (240, 246, 252)),
        ("Syndication RSS/Atom", "Dynamic XML/JSON Feed Ingestion Parser", "45 Custom Feeds", "60s Interval", (249, 115, 22)),
        ("Crypto & Financial", "Real-time Volatility & Price Tickers", "Top 20 Assets", "10s Interval", (34, 197, 94)),
    ]

    # Render 6 provider cards in a 2x3 grid
    cols = 2
    cw = (W - 32 * 2 - 20) // 2
    ch = 140

    for i, (name, desc, stat, interval, accent) in enumerate(providers):
        row = i // cols
        col = i % cols
        x = 32 + col * (cw + 20)
        y = 88 + row * (ch + 16)

        draw.rounded_rectangle([x, y, x + cw, y + ch], radius=6, fill=(12, 18, 30, 230), outline=(35, 50, 78))
        # Top Accent strip
        draw.rectangle([x, y, x + 4, y + ch], fill=accent)

        draw.text((x + 20, y + 16), name, font=font_title, fill=(245, 248, 255))
        draw.rounded_rectangle([x + cw - 120, y + 16, x + cw - 16, y + 40], radius=4, fill=(accent[0], accent[1], accent[2], 35), outline=(accent[0], accent[1], accent[2], 120))
        draw.text((x + cw - 110, y + 22), "ACTIVE PROVIDER", font=font_mono_sm, fill=accent)

        draw.text((x + 20, y + 54), desc, font=font_subtitle, fill=(160, 175, 200))
        draw.line([x + 20, y + 84, x + cw - 20, y + 84], fill=(25, 38, 60), width=1)

        draw.text((x + 20, y + 98), f"STATUS: {stat}", font=font_mono_sm, fill=(56, 189, 248))
        draw.text((x + cw - 150, y + 98), f"RATE: {interval}", font=font_mono_sm, fill=(140, 160, 190))

    img.convert("RGB").save(f"{OUT_DIR}/feeds.webp", "WEBP", quality=90)
    print("Saved feeds.webp")

def generate_bot():
    img, draw = create_base("Discord Bot Dispatcher & Interactive Controls", "Discord.py Ingestion & Gateway Embeds", "SYS.VIEW: /discord/gateway", (59, 130, 246))

    # Mock Discord Dark Chat Window in center
    dw = 820
    dx = (W - dw) // 2
    dy = 88
    dh = H - 145

    draw.rounded_rectangle([dx, dy, dx + dw, dy + dh], radius=8, fill=(18, 20, 26, 245), outline=(40, 45, 58))
    # Discord channel header inside card
    draw.rectangle([dx, dy, dx + dw, dy + 44], fill=(24, 26, 34))
    draw.text((dx + 20, dy + 12), "# 🔔・live-announcements", font=font_title, fill=(230, 235, 245))
    draw.text((dx + dw - 240, dy + 16), "Topic: Automated notifications by Nova", font=font_mono_sm, fill=(120, 130, 150))
    draw.line([dx, dy + 44, dx + dw, dy + 44], fill=(35, 40, 52), width=1)

    # Bot Message Header
    logo_msg = logo_raw.resize((42, 42), Image.Resampling.LANCZOS)
    img.paste(logo_msg, (dx + 24, dy + 60), logo_msg)

    draw.text((dx + 78, dy + 62), "Nova Bot", font=font_title, fill=(255, 255, 255))
    draw.rounded_rectangle([dx + 195, dy + 66, dx + 240, dy + 86], radius=3, fill=(88, 101, 242))
    draw.text((dx + 203, dy + 69), "BOT", font=font_mono_sm, fill=(255, 255, 255))
    draw.text((dx + 252, dy + 68), "Today at 14:42 • Via Webhook Pipeline", font=font_mono_sm, fill=(115, 125, 140))

    # Discord Role Mention Text
    draw.rounded_rectangle([dx + 78, dy + 95, dx + 185, dy + 118], radius=3, fill=(88, 101, 242, 40))
    draw.text((dx + 84, dy + 98), "@Community Alerts", font=font_mono_sm, fill=(150, 175, 255))
    draw.text((dx + 195, dy + 98), "New stream has gone live!", font=font_subtitle, fill=(220, 225, 235))

    # Discord Rich Embed Card
    ex = dx + 78
    ey = dy + 130
    ew = dw - 110
    eh = 200

    draw.rounded_rectangle([ex, ey, ex + ew, ey + eh], radius=6, fill=(24, 27, 36), outline=(38, 44, 58))
    # Purple embed border strip on left
    draw.rectangle([ex, ey, ex + 5, ey + eh], fill=(168, 85, 247))

    draw.text((ex + 20, ey + 18), "🔴 LIVE NOW ON TWITCH", font=font_mono_sm, fill=(168, 85, 247))
    draw.text((ex + 20, ey + 40), "Cyberpunk 2077: Phantom Liberty • Ultra Nightmare Run", font=font_title, fill=(255, 255, 255))
    draw.text((ex + 20, ey + 75), "Streaming in 1440p60 HDR with interactive crowd control commands enabled! Come join the lobby.", font=font_subtitle, fill=(185, 195, 210))

    # Embed Fields
    draw.text((ex + 20, ey + 115), "GAME CATEGORY", font=font_mono_sm, fill=(110, 125, 145))
    draw.text((ex + 20, ey + 135), "Action RPG", font=font_subtitle, fill=(230, 235, 245))

    draw.text((ex + 240, ey + 115), "VIEWER COUNT", font=font_mono_sm, fill=(110, 125, 145))
    draw.text((ex + 240, ey + 135), "14,820 Viewers", font=font_subtitle, fill=(56, 189, 248))

    draw.text((ex + 460, ey + 115), "UPTIME", font=font_mono_sm, fill=(110, 125, 145))
    draw.text((ex + 460, ey + 135), "01h 24m", font=font_subtitle, fill=(34, 197, 94))

    # Action buttons below embed
    draw.rounded_rectangle([ex + 20, ey + 162, ex + 140, ey + 188], radius=4, fill=(88, 101, 242))
    draw.text((ex + 38, ey + 167), "Watch Stream ↗", font=font_mono_sm, fill=(255, 255, 255))

    draw.rounded_rectangle([ex + 155, ey + 162, ex + 280, ey + 188], radius=4, fill=(45, 52, 68))
    draw.text((ex + 172, ey + 167), "Configure Feed ⚙", font=font_mono_sm, fill=(200, 210, 225))

    img.convert("RGB").save(f"{OUT_DIR}/bot.webp", "WEBP", quality=90)
    print("Saved bot.webp")

generate_dashboard()
generate_feeds()
generate_bot()
