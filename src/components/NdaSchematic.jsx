import { useMemo } from 'react';
import { ARCH_TIERS } from '../constants';

// NDA plates have no screenshot — an enterprise platform reading "no picture"
// twice is a weak beat for a CTO (persona audit 2026-07-05, item 9). This draws
// an ABSTRACT, product-agnostic system schematic instead: generic tiers (Client
// → API Gateway → Services → Data Store) with no real names or data, so the
// plate carries "a real platform lives here" proof without breaching the NDA.
// `architecture` (from constants) is an ordered list of columns of tier keys;
// every node in a column auto-flows to every node in the next.

const NODE_W = 116;
const NODE_H = 42;
const COL_GAP = 48;
const ROW_GAP = 24;
const PAD = 18;

const NdaSchematic = ({ architecture, label }) => {
  const { boxes, edges, w, h } = useMemo(() => {
    const colH = architecture.map((n) => n.length * NODE_H + (n.length - 1) * ROW_GAP);
    const maxH = Math.max(...colH);
    const width = architecture.length * NODE_W + (architecture.length - 1) * COL_GAP + PAD * 2;
    const height = maxH + PAD * 2;

    const nodeBoxes = [];
    const centers = []; // per-column [{ xL, xR, cy }]
    architecture.forEach((nodes, i) => {
      const x = PAD + i * (NODE_W + COL_GAP);
      const startY = PAD + (maxH - colH[i]) / 2;
      const colCenters = [];
      nodes.forEach((key, j) => {
        const y = startY + j * (NODE_H + ROW_GAP);
        nodeBoxes.push({ x, y, label: ARCH_TIERS[key] || key });
        colCenters.push({ xL: x, xR: x + NODE_W, cy: y + NODE_H / 2 });
      });
      centers.push(colCenters);
    });

    // Auto-flow: connect every node in column i to every node in column i+1.
    const paths = [];
    for (let i = 0; i < centers.length - 1; i += 1) {
      centers[i].forEach((a) => centers[i + 1].forEach((b) => {
        const mx = (a.xR + b.xL) / 2;
        paths.push(`M${a.xR},${a.cy} C${mx},${a.cy} ${mx},${b.cy} ${b.xL},${b.cy}`);
      }));
    }
    return { boxes: nodeBoxes, edges: paths, w: width, h: height };
  }, [architecture]);

  return (
    <svg className="nda-schem" viewBox={`0 0 ${w} ${h}`} role="img" aria-label={label} preserveAspectRatio="xMidYMid meet">
      <defs>
        <marker id="nda-arrow" viewBox="0 0 8 8" refX="6.4" refY="4" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M1,1 L6.4,4 L1,7" className="nda-schem__arrow" />
        </marker>
      </defs>
      {edges.map((d, i) => (
        <path key={`e${i}`} d={d} className="nda-schem__edge" markerEnd="url(#nda-arrow)" />
      ))}
      {boxes.map((b, i) => (
        <g key={`n${i}`}>
          <rect x={b.x} y={b.y} width={NODE_W} height={NODE_H} rx="9" className="nda-schem__box" />
          <text x={b.x + NODE_W / 2} y={b.y + NODE_H / 2} className="nda-schem__label" dominantBaseline="central" textAnchor="middle">
            {b.label}
          </text>
        </g>
      ))}
    </svg>
  );
};

export default NdaSchematic;
