import os
from PIL import Image

src_dir = r"C:\Users\kesav\OneDrive\Documents\IGNITE\Luxury-Sports-Hub\client\public\images\WEB DESIGN\PHOTOS"
dest_dir = r"C:\Users\kesav\OneDrive\Documents\IGNITE\Luxury-Sports-Hub\client\public\images"

files = sorted([f for f in os.listdir(src_dir) if f.lower().endswith(".jpg") and not f.endswith(".part")])
print(f"Found {len(files)} source photos: {files}")

def process_image(src_path, dest_path, width, height, quality=88):
    with Image.open(src_path) as img:
        if img.mode != 'RGB':
            img = img.convert('RGB')
        img_ratio = img.width / img.height
        target_ratio = width / height
        if img_ratio > target_ratio:
            new_width = int(img.height * target_ratio)
            offset = (img.width - new_width) // 2
            img = img.crop((offset, 0, offset + new_width, img.height))
        else:
            new_height = int(img.width / target_ratio)
            offset = (img.height - new_height) // 2
            img = img.crop((0, offset, img.width, offset + new_height))
        img = img.resize((width, height), Image.Resampling.LANCZOS)
        img.save(dest_path, "JPEG", quality=quality)
        print(f"  Saved: {os.path.basename(dest_path)} ({width}x{height}, {os.path.getsize(dest_path)//1024}KB)")

# Mapping: filename -> (dest_name, width, height)
# First number in user list is used as primary image for the sport
mappings = [
    ("DLP07971.JPG",  "hero-real.jpg",       1920, 1080, 90),  # Hero panoramic
    ("DLP07972.JPG",  "about-arena.jpg",     1200, 800,  88),  # About page
    
    # Sports - Primary Images
    ("DLP08350.JPG",  "volleyball.jpg",      900,  600,  88),
    ("DLP08319.JPG",  "pickleball.jpg",      900,  600,  88),
    ("DLP08088.JPG",  "air-hockey.jpg",      900,  600,  88),
    ("DLP08066.JPG",  "table-tennis.jpg",    900,  600,  88),
    ("DLP08045.JPG",  "foosball.jpg",        900,  600,  88),
    ("DLP08021.JPG",  "carroms.jpg",         900,  600,  88),
    ("DLP08002.JPG",  "chess.jpg",           900,  600,  88),
    
    # Placeholders for missing info (Cricket, Zumba)
    ("DLP07973.JPG",  "cricket.jpg",         900,  600,  88),
    ("DLP07974.JPG",  "zumba.jpg",           900,  600,  88),

    # Gallery / Additional Images
    ("DLP08348.JPG",  "gallery-volley-1.jpg",  800,  600,  85),
    ("DLP08341.JPG",  "gallery-volley-2.jpg",  800,  600,  85),
    ("DLP08339.JPG",  "gallery-volley-3.jpg",  800,  600,  85),
    ("DLP08336.JPG",  "gallery-volley-4.jpg",  800,  600,  85),
    ("DLP08324.JPG",  "gallery-volley-5.jpg",  800,  600,  85),
    
    ("DLP08310.JPG",  "gallery-pickle-1.jpg",  800,  600,  85),
    
    ("DLP08075.JPG",  "gallery-airhockey-1.jpg", 800,  600,  85),
    
    ("DLP08065.JPG",  "gallery-tabletennis-1.jpg", 800,  600,  85),
    ("DLP08055.JPG",  "gallery-tabletennis-2.jpg", 800,  600,  85),
    ("DLP08050.JPG",  "gallery-tabletennis-3.jpg", 800,  600,  85),
    ("DLP08047.JPG",  "gallery-tabletennis-4.jpg", 800,  600,  85),
    
    ("DLP08041.JPG",  "gallery-foosball-1.jpg",  800,  600,  85),
    ("DLP08038.JPG",  "gallery-foosball-2.jpg",  800,  600,  85),
    ("DLP08035.JPG",  "gallery-foosball-3.jpg",  800,  600,  85),
    ("DLP08033.JPG",  "gallery-foosball-4.jpg",  800,  600,  85),
    ("DLP08029.JPG",  "gallery-foosball-5.jpg",  800,  600,  85),
    
    ("DLP08017.JPG",  "gallery-carroms-1.jpg",   800,  600,  85),
    ("DLP08008.JPG",  "gallery-carroms-2.jpg",   800,  600,  85),
    
    ("DLP07998.JPG",  "gallery-chess-1.jpg",     800,  600,  85),
]

for entry in mappings:
    src_file, dest_name, w, h, q = entry
    src_path = os.path.join(src_dir, src_file)
    dest_path = os.path.join(dest_dir, dest_name)
    
    if not os.path.exists(src_path):
        print(f"  SKIPPING: {src_file} not found in {src_dir}")
        continue
        
    try:
        process_image(src_path, dest_path, w, h, q)
    except Exception as e:
        print(f"  ERROR processing {src_file}: {e}")

print("\nAll done!")
