import { ImageResponse } from "next/og";

const SIZES: Record<string, { px: number; pad: number }> = { "180": { px: 180, pad: 0 }, "192": { px: 192, pad: 0 }, "512": { px: 512, pad: 0 }, "512-maskable": { px: 512, pad: 0.2 } };

export async function GET(_: Request, { params }: { params: Promise<{ size: string }> }) {
  const { size } = await params;
  const cfg = SIZES[size];
  if (!cfg) return new Response("Not found", { status: 404 });
  const s = cfg.px, inner = s * (1 - cfg.pad * 2);
  return new ImageResponse(
    (
      <div style={{ width: s, height: s, display: "flex", alignItems: "center", justifyContent: "center", background: "#F28C0F", borderRadius: cfg.pad ? 0 : s / 2 }}>
        <div style={{ width: inner, height: inner, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: inner * 0.22, height: inner * 0.34, background: "#FFF8EC", borderRadius: "50% 50% 50% 50% / 70% 70% 30% 30%", marginBottom: inner * 0.04 }} />
          <div style={{ width: inner * 0.56, height: inner * 0.22, background: "#8E1B2D", borderRadius: `0 0 ${inner * 0.3}px ${inner * 0.3}px` }} />
        </div>
      </div>
    ),
    { width: s, height: s, headers: { "Cache-Control": "public, max-age=31536000, immutable" } },
  );
}
