/*
  Warnings:

  - Added the required column `iconSlug` to the `Nation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable: まず一時的なデフォルト値でカラムを追加
ALTER TABLE "Nation" ADD COLUMN "iconSlug" TEXT NOT NULL DEFAULT '';

-- 既存データにiconSlugを設定
UPDATE "Nation" SET "iconSlug" = 'moon' WHERE "slug" = 'night';
UPDATE "Nation" SET "iconSlug" = 'dove' WHERE "slug" = 'silent';
UPDATE "Nation" SET "iconSlug" = 'flame' WHERE "slug" = 'truth';

-- デフォルト値を削除（今後は必須）
ALTER TABLE "Nation" ALTER COLUMN "iconSlug" DROP DEFAULT;
