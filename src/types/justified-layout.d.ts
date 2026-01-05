declare module "justified-layout" {
  interface JustifiedLayoutOptions {
    containerWidth: number;
    containerPadding?: number | number[];
    boxSpacing?: number | number[];
    targetRowHeight?: number;
    targetRowHeightTolerance?: number;
    maxNumRows?: number;
    forceAspectRatio?: number;
    showWidows?: boolean;
    fullWidthBreakoutRowCadence?: number;
  }

  interface JustifiedLayoutBox {
    top: number;
    left: number;
    width: number;
    height: number;
    row: number;
  }

  interface JustifiedLayoutGeometry {
    containerHeight: number;
    boxes: JustifiedLayoutBox[];
  }

  export default function justifiedLayout(
    aspectRatios: number[],
    options: JustifiedLayoutOptions
  ): JustifiedLayoutGeometry;
}
