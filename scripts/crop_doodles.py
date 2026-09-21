from collections import deque
from pathlib import Path

from PIL import Image

SHEET = Path(r"reference\icons.png")
OUT = Path(r"public\images\doodles")
PREVIEW = Path(r"scripts\doodle-preview")

im = Image.open(SHEET).convert("RGBA")
w, h = im.size
cw, ch = w // 6, h // 6
pixels = im.load()
apix = im.split()[3].load()

NEEDED = {
    "pigeon": (0, 0),
    "sun": (2, 0),
    "heart": (1, 5),
    "moon": (2, 1),
    "running-shoe": (0, 2),
    "coffee": (1, 4),
    "meditation": (1, 1),
    "mountains": (3, 3),
    "calendar": (4, 5),
}

THRESHOLD = 16
# Sun rays sit a few pixels off the disc; neighbour slivers sit on the cell edge.
MAX_GAP = 28


def neighbours(x, y, cx0, cy0, cx1, cy1):
    for dx, dy in ((1, 0), (-1, 0), (0, 1), (0, -1), (1, 1), (1, -1), (-1, 1), (-1, -1)):
        nx, ny = x + dx, y + dy
        if cx0 <= nx < cx1 and cy0 <= ny < cy1:
            yield nx, ny


def components(cx0, cy0, cx1, cy1):
    visited = set()
    blobs = []
    for y in range(cy0, cy1):
        for x in range(cx0, cx1):
            if (x, y) in visited or apix[x, y] <= THRESHOLD:
                continue
            q = deque([(x, y)])
            visited.add((x, y))
            blob = [(x, y)]
            while q:
                cx, cy = q.popleft()
                for nx, ny in neighbours(cx, cy, cx0, cy0, cx1, cy1):
                    if (nx, ny) in visited or apix[nx, ny] <= THRESHOLD:
                        continue
                    visited.add((nx, ny))
                    q.append((nx, ny))
                    blob.append((nx, ny))
            xs = [p[0] for p in blob]
            ys = [p[1] for p in blob]
            blobs.append({"points": blob, "bbox": (min(xs), min(ys), max(xs) + 1, max(ys) + 1)})
    blobs.sort(key=lambda b: len(b["points"]), reverse=True)
    return blobs


def rect_gap(a, b):
    ax0, ay0, ax1, ay1 = a
    bx0, by0, bx1, by1 = b
    dx = max(0, bx0 - ax1, ax0 - bx1)
    dy = max(0, by0 - ay1, ay0 - by1)
    return max(dx, dy)


def dilate(points, box, radius=2):
    x0, y0, x1, y1 = box
    keep = set(points)
    extra = set()
    for x, y in keep:
        for dx in range(-radius, radius + 1):
            for dy in range(-radius, radius + 1):
                nx, ny = x + dx, y + dy
                if x0 <= nx < x1 and y0 <= ny < y1:
                    extra.add((nx, ny))
    return keep | extra


def mask_crop(bbox, keep):
    x0, y0, x1, y1 = bbox
    crop = Image.new("RGBA", (x1 - x0, y1 - y0), (0, 0, 0, 0))
    dest = crop.load()
    for x, y in keep:
        dest[x - x0, y - y0] = pixels[x, y]
    return crop


OUT.mkdir(parents=True, exist_ok=True)
PREVIEW.mkdir(parents=True, exist_ok=True)

for name, (r, c) in NEEDED.items():
    cx0, cy0 = c * cw, r * ch
    cx1, cy1 = cx0 + cw, cy0 + ch
    blobs = components(cx0, cy0, cx1, cy1)
    if not blobs:
        raise SystemExit(f"empty cell for {name}")
    main = blobs[0]
    keep_points = list(main["points"])
    kept = 1
    for blob in blobs[1:]:
        if rect_gap(main["bbox"], blob["bbox"]) <= MAX_GAP:
            keep_points.extend(blob["points"])
            kept += 1
    xs = [p[0] for p in keep_points]
    ys = [p[1] for p in keep_points]
    x0, y0, x1, y1 = min(xs), min(ys), max(xs) + 1, max(ys) + 1
    pad = 2
    bbox = (max(cx0, x0 - pad), max(cy0, y0 - pad), min(cx1, x1 + pad), min(cy1, y1 + pad))
    keep = dilate(keep_points, bbox, 2)
    crop = mask_crop(bbox, keep)
    crop.save(OUT / f"{name}.png", "PNG")
    cream = Image.new("RGBA", crop.size, (246, 236, 218, 255))
    cream.alpha_composite(crop)
    cream.save(PREVIEW / f"{name}-on-cream.png", "PNG")
    rose = Image.new("RGBA", crop.size, (247, 232, 226, 255))
    rose.alpha_composite(crop)
    rose.save(PREVIEW / f"{name}-on-rose.png", "PNG")
    print(name, crop.size, "blobs", kept, "/", len(blobs), "bbox", bbox)
