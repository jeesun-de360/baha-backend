import multer, { StorageEngine, FileFilterCallback } from "multer";
import path from "path";
import fs from "fs";
import { Request } from "express";

// ─── Allowed MIME Types ───────────────────────────────────────────────────────
const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
];

// ─── Ensure Upload Directory Exists ──────────────────────────────────────────
function ensureDir(dirPath: string): void {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// ─── Disk Storage Factory ─────────────────────────────────────────────────────
function createDiskStorage(folder: string): StorageEngine {
  const uploadPath = path.join("uploads", folder);
  ensureDir(uploadPath);

  return multer.diskStorage({
    destination: (_req, _file, cb) => {
      cb(null, uploadPath);
    },
    filename: (_req, file, cb) => {
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      const ext = path.extname(file.originalname).toLowerCase();
      const baseName = path
        .basename(file.originalname, ext)
        .replace(/\s+/g, "-")
        .toLowerCase();
      cb(null, `${baseName}-${uniqueSuffix}${ext}`);
    },
  });
}

// ─── Image File Filter ────────────────────────────────────────────────────────
const imageFileFilter = (
  _req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  if (ALLOWED_IMAGE_TYPES.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error(
        `Invalid file type "${file.mimetype}". Allowed types: ${ALLOWED_IMAGE_TYPES.join(", ")}`
      )
    );
  }
};

// ─── Pre-configured Upload Instances ─────────────────────────────────────────

/**
 * Upload a single image.
 * Field name: "image"
 * Max size:   5 MB
 * Folder:     uploads/images/
 */
export const uploadSingleImage = multer({
  storage: createDiskStorage("images"),
  fileFilter: imageFileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
}).single("image");

/**
 * Upload multiple images (up to 10).
 * Field name: "images"
 * Max size per file: 5 MB
 * Folder: uploads/images/
 */
export const uploadMultipleImages = multer({
  storage: createDiskStorage("images"),
  fileFilter: imageFileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB per file
}).array("images", 10);

/**
 * Upload product images:
 *   - "image"   → single primary/thumbnail image
 *   - "gallery" → up to 10 additional images
 * Folder: uploads/products/
 */
export const uploadProductImages = multer({
  storage: createDiskStorage("products"),
  fileFilter: imageFileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB per file
}).fields([
  { name: "image", maxCount: 1 },
  { name: "gallery", maxCount: 10 },
]);

/**
 * Upload a single hero-slider image.
 * Field name: "sliderImage"
 * Max size:   8 MB  (hero images are often larger)
 * Folder:     uploads/hero-slider/
 */
export const uploadSliderImage = multer({
  storage: createDiskStorage("hero-slider"),
  fileFilter: imageFileFilter,
  limits: { fileSize: 8 * 1024 * 1024 }, // 8 MB
}).single("sliderImage");

/**
 * Upload a single testimonial / avatar image.
 * Field name: "avatar"
 * Max size:   2 MB
 * Folder:     uploads/testimonials/
 */
export const uploadAvatarImage = multer({
  storage: createDiskStorage("testimonials"),
  fileFilter: imageFileFilter,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2 MB
}).single("avatar");

/**
 * Upload a single category image.
 * Field name: "image"
 * Max size:   3 MB
 * Folder:     uploads/categories/
 */
export const uploadCategoryImage = multer({
  storage: createDiskStorage("categories"),
  fileFilter: imageFileFilter,
  limits: { fileSize: 3 * 1024 * 1024 }, // 3 MB
}).single("image");

// ─── Custom Upload Builder ────────────────────────────────────────────────────

interface UploadOptions {
  /** Subdirectory inside uploads/ */
  folder?: string;
  /** Max file size in bytes (default: 5 MB) */
  maxFileSizeBytes?: number;
  /** Allowed MIME types (default: standard image types) */
  allowedMimeTypes?: string[];
}

/**
 * Factory to create a fully custom multer upload middleware.
 *
 * @example
 * const upload = createUpload({ folder: "banners", maxFileSizeBytes: 10 * 1024 * 1024 });
 * router.post("/banner", upload.single("banner"), controller);
 */
export function createUpload(options: UploadOptions = {}) {
  const {
    folder = "misc",
    maxFileSizeBytes = 5 * 1024 * 1024,
    allowedMimeTypes = ALLOWED_IMAGE_TYPES,
  } = options;

  const customFilter = (
    _req: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback
  ) => {
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        new Error(
          `Invalid file type "${file.mimetype}". Allowed: ${allowedMimeTypes.join(", ")}`
        )
      );
    }
  };

  return multer({
    storage: createDiskStorage(folder),
    fileFilter: customFilter,
    limits: { fileSize: maxFileSizeBytes },
  });
}

// ─── Helper: Normalise File Path for DB Storage ───────────────────────────────

/**
 * Converts a multer file.path (OS-specific) to a normalised,
 * forward-slash URL path suitable for storing in MongoDB.
 *
 * @example
 * // req.file.path → "uploads\\products\\shirt-1234567890.webp"
 * getFilePath(req.file) // → "/uploads/products/shirt-1234567890.webp"
 */
export function getFilePath(file: Express.Multer.File): string {
  return "/" + file.path.replace(/\\/g, "/");
}

/**
 * Same as getFilePath but for an array of files (e.g. from .array() or .fields()).
 */
export function getFilePaths(files: Express.Multer.File[]): string[] {
  return files.map(getFilePath);
}
