#!/bin/bash

# Enable nullglob so empty folders don't break the loop
# Enable nocaseglob to catch .PNG, .png, .WEBP, .webp
shopt -s nullglob nocaseglob

FOLDERS=("dark" "light")
BASE_OUTPUT_DIR="output_images"
TARGET_WIDTH=800

for FOLDER in "${FOLDERS[@]}"; do
  # Check if input directory exists
  if [ ! -d "$FOLDER" ]; then
    echo "⚠️ Folder '$FOLDER' not found. Skipping."
    continue
  fi

  OUTPUT_DIR="$BASE_OUTPUT_DIR/$FOLDER"
  mkdir -p "$OUTPUT_DIR"
  
  echo "📂 Processing folder: $FOLDER"

  # Loop through webp and png files
  for img in "$FOLDER"/*.{webp,png}; do
    filename=$(basename "$img")
    
    # Extract the name without extension, and the extension itself
    name_no_ext="${filename%.*}"
    ext="${filename##*.}"
    
    # Convert extension to lowercase for reliable comparison
    ext_lower=$(echo "$ext" | tr '[:upper:]' '[:lower:]')
    
    echo "  -> Processing: $filename..."
    
    if [ "$ext_lower" == "png" ]; then
      # PNG OPTIMIZATION: 
      # -q 85: Slightly higher quality to preserve sharp PNG details.
      # -alpha_q 100: Preserves perfect edges on transparent backgrounds.
      cwebp -q 85 -alpha_q 100 -m 6 -resize $TARGET_WIDTH 0 "$img" -o "$OUTPUT_DIR/$name_no_ext.webp" -quiet
    else
      # WEBP OPTIMIZATION:
      # -q 80: Standard visually lossless compression.
      cwebp -q 80 -m 6 -resize $TARGET_WIDTH 0 "$img" -o "$OUTPUT_DIR/$name_no_ext.webp" -quiet
    fi
  done
done

echo "🎉 All images compressed and converted!"