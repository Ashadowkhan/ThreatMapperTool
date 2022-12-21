import G6 from '@antv/g6';
import { useEffect, useState } from 'react';

import { COLORS } from './theme';
import { IGraph, OptionsWithoutContainer } from './types';

const toolbar = new G6.ToolBar({
  className: 'absolute bottom-2.5 left-2.5',
  getContent: () => `<div>
    <ul class="list-none m-0 p-2.5 pt-0 border-solid border border-[#abb2b7]">
      <li code="zoom-out" title="Zoom Out" class="mt-2.5 cursor-pointer">
        <svg class="fill-[#abb2b7]" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
          <path d="M658.432 428.736a33.216 33.216 0 0 1-33.152 33.152H525.824v99.456a33.216 33.216 0 0 1-66.304 0V461.888H360.064a33.152 33.152 0 0 1 0-66.304H459.52V296.128a33.152 33.152 0 0 1 66.304 0V395.52H625.28c18.24 0 33.152 14.848 33.152 33.152z m299.776 521.792a43.328 43.328 0 0 1-60.864-6.912l-189.248-220.992a362.368 362.368 0 0 1-215.36 70.848 364.8 364.8 0 1 1 364.8-364.736 363.072 363.072 0 0 1-86.912 235.968l192.384 224.64a43.392 43.392 0 0 1-4.8 61.184z m-465.536-223.36a298.816 298.816 0 0 0 298.432-298.432 298.816 298.816 0 0 0-298.432-298.432A298.816 298.816 0 0 0 194.24 428.8a298.816 298.816 0 0 0 298.432 298.432z"></path>
        </svg>
      </li>
      <li code="zoom-in" title="Zoom In" class="mt-2.5 cursor-pointer">
        <svg class="fill-[#abb2b7]" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
          <path d="M639.936 416a32 32 0 0 1-32 32h-256a32 32 0 0 1 0-64h256a32 32 0 0 1 32 32z m289.28 503.552a41.792 41.792 0 0 1-58.752-6.656l-182.656-213.248A349.76 349.76 0 0 1 480 768 352 352 0 1 1 832 416a350.4 350.4 0 0 1-83.84 227.712l185.664 216.768a41.856 41.856 0 0 1-4.608 59.072zM479.936 704c158.784 0 288-129.216 288-288S638.72 128 479.936 128a288.32 288.32 0 0 0-288 288c0 158.784 129.216 288 288 288z" p-id="3853"></path>
        </svg>
      </li>
      <li code="actual-size" title="Re-center" class="mt-2.5 cursor-pointer">
        <svg class="fill-[#abb2b7]" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="20" height="24">
          <path d="M684.288 305.28l0.128-0.64-0.128-0.64V99.712c0-19.84 15.552-35.904 34.496-35.712a35.072 35.072 0 0 1 34.56 35.776v171.008h170.944c19.648 0 35.84 15.488 35.712 34.432a35.072 35.072 0 0 1-35.84 34.496h-204.16l-0.64-0.128a32.768 32.768 0 0 1-20.864-7.552c-1.344-1.024-2.816-1.664-3.968-2.816-0.384-0.32-0.512-0.768-0.832-1.088a33.472 33.472 0 0 1-9.408-22.848zM305.28 64a35.072 35.072 0 0 0-34.56 35.776v171.008H99.776A35.072 35.072 0 0 0 64 305.216c0 18.944 15.872 34.496 35.84 34.496h204.16l0.64-0.128a32.896 32.896 0 0 0 20.864-7.552c1.344-1.024 2.816-1.664 3.904-2.816 0.384-0.32 0.512-0.768 0.768-1.088a33.024 33.024 0 0 0 9.536-22.848l-0.128-0.64 0.128-0.704V99.712A35.008 35.008 0 0 0 305.216 64z m618.944 620.288h-204.16l-0.64 0.128-0.512-0.128c-7.808 0-14.72 3.2-20.48 7.68-1.28 1.024-2.752 1.664-3.84 2.752-0.384 0.32-0.512 0.768-0.832 1.088a33.664 33.664 0 0 0-9.408 22.912l0.128 0.64-0.128 0.704v204.288c0 19.712 15.552 35.904 34.496 35.712a35.072 35.072 0 0 0 34.56-35.776V753.28h170.944c19.648 0 35.84-15.488 35.712-34.432a35.072 35.072 0 0 0-35.84-34.496z m-593.92 11.52c-0.256-0.32-0.384-0.768-0.768-1.088-1.088-1.088-2.56-1.728-3.84-2.688a33.088 33.088 0 0 0-20.48-7.68l-0.512 0.064-0.64-0.128H99.84a35.072 35.072 0 0 0-35.84 34.496 35.072 35.072 0 0 0 35.712 34.432H270.72v171.008c0 19.84 15.552 35.84 34.56 35.776a35.008 35.008 0 0 0 34.432-35.712V720l-0.128-0.64 0.128-0.704a33.344 33.344 0 0 0-9.472-22.848zM512 374.144a137.92 137.92 0 1 0 0.128 275.84A137.92 137.92 0 0 0 512 374.08z"></path>
        </svg>
      </li>
    </ul>
  </div>`,
  handleClick: (code, graph) => {
    const sensitivity = 2;
    const DELTA = 0.05;
    if (code === 'zoom-out') {
      const currentZoom = graph.getZoom();
      const height = graph.getHeight();
      const width = graph.getWidth();
      const ratioOut = 1 / (1 - DELTA * sensitivity);
      const maxZoom = graph.get('maxZoom');
      if (ratioOut * currentZoom > maxZoom) {
        return;
      }
      graph.zoomTo(currentZoom * ratioOut, {
        x: width / 2,
        y: height / 2,
      });
    } else if (code === 'zoom-in') {
      const currentZoom = graph.getZoom();
      const height = graph.getHeight();
      const width = graph.getWidth();
      const ratioIn = 1 - DELTA * sensitivity;
      const minZoom = graph.get('minZoom');
      if (ratioIn * currentZoom < minZoom) {
        return;
      }
      graph.zoomTo(currentZoom * ratioIn, {
        x: width / 2,
        y: height / 2,
      });
    } else if (code === 'actual-size') {
      graph.fitView();
    }
  },
});

const graphModeEnableOptimize = (mode: string) => {
  return {
    type: mode,
    enableOptimize: true,
    sensitivity: 0.7,
  };
};

const DEFAULT_OPTIONS: OptionsWithoutContainer = {
  animate: false,
  fitCenter: true,
  groupByTypes: false,
  defaultNode: {
    style: {
      // DO NOT set .fill here, as it breaks image nodes.
      stroke: COLORS.NODE_OUTLINE,
      lineWidth: 2,
      cursor: 'pointer',
    },
    labelCfg: {
      position: 'bottom',
      offset: 12,
      style: {
        stroke: 'black',
        lineWidth: 0,
        fill: COLORS.LABEL,
        fontFamily: 'Source Sans Pro',
        fontSize: 20,
        background: {
          fill: '#ffffff',
          fillOpacity: 0.1,
          padding: [2, 4, 2, 4],
          radius: 2,
        },
      },
    },
  },
  defaultEdge: {
    type: 'cubic',
    size: 2,
    color: COLORS.EDGE,
    style: {
      opacity: 0.6,
      endArrow: {
        path: G6.Arrow.triangle(4, 6, 12),
        opacity: 0.6,
        strokeOpacity: 0.6,
        fillOpacity: 0.6,
        d: 16,
      },
    },
  },
  defaultCombo: {
    padding: 0,
    style: {
      fill: '#111111',
      fillOpacity: 0.6,
      stroke: COLORS.EDGE,
      strokeOpacity: 0.5,
    },
  },

  // state style
  nodeStateStyles: {
    active: {
      fill: '#fefefe',
    },
    inactive: {
      fill: 'red',
    },
  },
  comboStateStyles: {
    active: {},
    inactive: {},
  },

  edgeStateStyles: {
    active: {
      lineWidth: 3,
      stroke: COLORS.ACTIVE_EDGE,
      opacity: 0.6,
    },
  },

  modes: {
    default: [
      graphModeEnableOptimize('drag-canvas'),
      graphModeEnableOptimize('zoom-canvas'),
      {
        type: 'drag-node',
        onlyChangeComboSize: true,
      },
      'drag-combo',
      // {
      //   type: "activate-relations",
      //   trigger: "mouseenter",
      // },
    ],
  },
};

export const useG6raph = <D,>(
  graphContainer: HTMLElement | null,
  data: D,
  options: OptionsWithoutContainer = {},
) => {
  const [graph, setGraph] = useState<IGraph | null>(null);

  useEffect(() => {
    if (!graphContainer) {
      return;
    }
    const plugins = options.plugins ?? [];
    const width = graphContainer.offsetWidth;
    const height = graphContainer.offsetHeight;
    const graph = new G6.Graph({
      plugins: [...plugins, toolbar],
      ...DEFAULT_OPTIONS,
      ...options,
      container: graphContainer,
      width,
      height,
    });
    graph.data(data);
    graph.render();
    setGraph(graph);
  }, [graphContainer]);

  return { graph };
};
