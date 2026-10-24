export function publicFileUrl(key: string): string {
  return `https://${process.env.NEXT_PUBLIC_UPLOADTHING_APP_ID!}.ufs.sh/f/${key}`;
}
