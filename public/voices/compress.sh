#!/bin/bash

# Enable nullglob so empty folders don't break the loop
# Enable nocaseglob to catch .JPG, .png, etc.
shopt -s nullglob nocaseglob

FOLDERS=("dark" "light")
BASE_OUTPUT_DIR="output_images"

for FOLDER in "${FOLDERS[@]}"; do
  # Check if input directory exists
  if [ ! -d "$FOLDER" ]; then
    echo "⚠️ Folder '$FOLDER' not found. Skipping."
    continue
  fi

  OUTPUT_DIR="$BASE_OUTPUT_DIR/$FOLDER"
  mkdir -p "$OUTPUT_DIR"
  
  echo "📂 Processing folder: $FOLDER"

  # Loop through all standard image types
  for img in "$FOLDER"/*.{webp,jpg,jpeg,png}; do
    filename=$(basename "$img")
    
    # Strip the original extension to prepare for the .webp extension
    name_no_ext="${filename%.*}"
    
    echo "  -> Processing: $filename..."
    
    cwebp -q 90 -m 6 -resize 800 0 "$img" -o "$OUTPUT_DIR/$name_no_ext.webp" -quiet
  done
done

echo "🎉 All folders processed!"