#!/usr/bin/env python3
"""Generate LinuxRingo app icons for all Android densities."""

import os
from PIL import Image, ImageDraw

RES_DIR = "android/app/src/main/res"

SIZES = {
    "mipmap-mdpi":    48,
    "mipmap-hdpi":    72,
    "mipmap-xhdpi":   96,
    "mipmap-xxhdpi":  144,
    "mipmap-xxxhdpi": 192,
}

PLAY_STORE_SIZE = 512  # Play Store hi-res icon

# Colors
BG_COLOR      = (30, 30, 46)   # Dark navy
ACCENT_COLOR  = (137, 220, 235) # Teal
WHITE         = (255, 255, 255)
YELLOW        = (249, 226, 175)
BLACK_BODY    = (30, 30, 46)


def draw_penguin_icon(draw: ImageDraw.ImageDraw, size: int):
    """Draw a simple penguin icon."""
    cx = size // 2
    margin = int(size * 0.08)

    # Body (black/dark oval)
    body_x0 = int(size * 0.22)
    body_y0 = int(size * 0.30)
    body_x1 = int(size * 0.78)
    body_y1 = int(size * 0.90)
    draw.ellipse([body_x0, body_y0, body_x1, body_y1], fill=(20, 20, 36))

    # White belly
    belly_x0 = int(size * 0.32)
    belly_y0 = int(size * 0.40)
    belly_x1 = int(size * 0.68)
    belly_y1 = int(size * 0.85)
    draw.ellipse([belly_x0, belly_y0, belly_x1, belly_y1], fill=WHITE)

    # Head
    head_r = int(size * 0.22)
    head_cx = cx
    head_cy = int(size * 0.28)
    draw.ellipse(
        [head_cx - head_r, head_cy - head_r, head_cx + head_r, head_cy + head_r],
        fill=(20, 20, 36)
    )

    # White face patch
    face_rx = int(size * 0.14)
    face_ry = int(size * 0.13)
    draw.ellipse(
        [head_cx - face_rx, head_cy - face_ry, head_cx + face_rx, head_cy + face_ry],
        fill=WHITE
    )

    # Eyes
    eye_r = max(2, int(size * 0.035))
    eye_offset_x = int(size * 0.07)
    eye_y = head_cy - int(size * 0.03)
    for ex in [head_cx - eye_offset_x, head_cx + eye_offset_x]:
        draw.ellipse([ex - eye_r, eye_y - eye_r, ex + eye_r, eye_y + eye_r], fill=(20, 20, 36))

    # Beak
    beak_w = int(size * 0.10)
    beak_h = int(size * 0.07)
    beak_y = head_cy + int(size * 0.05)
    draw.ellipse(
        [cx - beak_w // 2, beak_y, cx + beak_w // 2, beak_y + beak_h],
        fill=YELLOW
    )

    # Feet
    foot_w = int(size * 0.10)
    foot_h = int(size * 0.06)
    foot_y = int(size * 0.88)
    for fx in [int(size * 0.35), int(size * 0.55)]:
        draw.ellipse([fx - foot_w // 2, foot_y, fx + foot_w // 2, foot_y + foot_h], fill=YELLOW)

    # Terminal prompt ">_" text area (bottom-right badge)
    badge_size = int(size * 0.36)
    badge_margin = int(size * 0.04)
    badge_x0 = size - badge_size - badge_margin
    badge_y0 = size - badge_size - badge_margin
    badge_x1 = size - badge_margin
    badge_y1 = size - badge_margin
    radius = int(badge_size * 0.25)
    # Rounded rect badge
    draw.rounded_rectangle([badge_x0, badge_y0, badge_x1, badge_y1], radius=radius, fill=ACCENT_COLOR)

    # Draw ">_" symbol on badge
    font_size = int(badge_size * 0.45)
    try:
        from PIL import ImageFont
        font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSansMono-Bold.ttf", font_size)
    except Exception:
        try:
            from PIL import ImageFont
            font = ImageFont.truetype("/usr/share/fonts/truetype/liberation/LiberationMono-Bold.ttf", font_size)
        except Exception:
            font = None

    text = ">_"
    text_color = BG_COLOR
    if font:
        bbox = draw.textbbox((0, 0), text, font=font)
        tw = bbox[2] - bbox[0]
        th = bbox[3] - bbox[1]
    else:
        tw = font_size * len(text) * 0.6
        th = font_size
    tx = badge_x0 + (badge_size - tw) // 2
    ty = badge_y0 + (badge_size - th) // 2
    draw.text((tx, ty), text, fill=text_color, font=font)


def create_icon(size: int) -> Image.Image:
    img = Image.new("RGBA", (size, size), BG_COLOR)
    draw = ImageDraw.Draw(img)

    # Rounded background
    radius = int(size * 0.22)
    draw.rounded_rectangle([0, 0, size - 1, size - 1], radius=radius, fill=BG_COLOR)

    draw_penguin_icon(draw, size)
    return img


def main():
    # Generate mipmap icons
    for folder, size in SIZES.items():
        out_dir = os.path.join(RES_DIR, folder)
        os.makedirs(out_dir, exist_ok=True)

        img = create_icon(size)
        rgb_img = img.convert("RGB")

        for name in ["ic_launcher.png", "ic_launcher_round.png"]:
            path = os.path.join(out_dir, name)
            rgb_img.save(path, "PNG")
            print(f"  ✓ {path} ({size}x{size})")

        # Foreground layer (same image, transparent bg)
        fg_img = create_icon(size)
        fg_path = os.path.join(out_dir, "ic_launcher_foreground.png")
        fg_img.save(fg_path, "PNG")
        print(f"  ✓ {fg_path} ({size}x{size})")

    # Play Store hi-res icon
    play_img = create_icon(PLAY_STORE_SIZE)
    play_path = "android/play_store_icon.png"
    play_img.convert("RGB").save(play_path, "PNG")
    print(f"\n  ✓ Play Store 아이콘: {play_path} ({PLAY_STORE_SIZE}x{PLAY_STORE_SIZE})")

    print("\n모든 아이콘 생성 완료!")


if __name__ == "__main__":
    main()
