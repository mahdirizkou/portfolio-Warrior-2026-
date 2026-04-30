"use client";

import { motion } from "framer-motion";

// ── Inline SVG logos — no CDN, no download needed ──────────────────
const LOGOS: Record<string, string> = {
    react: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="2.139" fill="currentColor"/><path d="M12 6.5c3.5 0 6.7.8 9 2.1 2.6 1.5 4 3.5 4 5.4s-1.4 3.9-4 5.4c-2.3 1.3-5.5 2.1-9 2.1s-6.7-.8-9-2.1C.4 17.9-1 15.9-1 14s1.4-3.9 4-5.4C5.3 7.3 8.5 6.5 12 6.5z" stroke="currentColor" stroke-width="1.2" fill="none"/><path d="M8.5 12c1.75-3.03 3.67-5.47 5.5-7 1.95-1.63 3.7-2.2 4.83-1.54 1.13.65 1.5 2.53.97 5.15-.47 2.3-1.7 5-3.3 7.55-1.6 2.55-3.4 4.7-5.1 6.08-1.85 1.48-3.6 2-4.73 1.35-1.13-.65-1.5-2.53-.97-5.15.47-2.3 1.7-5 2.8-6.44z" stroke="currentColor" stroke-width="1.2" fill="none"/><path d="M8.5 12c1.75 3.03 3.67 5.47 5.5 7 1.95 1.63 3.7 2.2 4.83 1.54 1.13-.65 1.5-2.53.97-5.15-.47-2.3-1.7-5-3.3-7.55C14.9 5.29 13.1 3.14 11.4 1.76 9.55.28 7.8-.24 6.67.41c-1.13.65-1.5 2.53-.97 5.15.47 2.3 1.7 5 2.8 6.44z" stroke="currentColor" stroke-width="1.2" fill="none"/></svg>`,

    nextjs: `<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 0 1-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 0 0-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.25 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 0 0-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 0 1-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.438.438 0 0 1-.157-.171l-.05-.106.006-4.703.007-4.705.072-.092a.645.645 0 0 1 .174-.143c.096-.047.134-.051.54-.051.478 0 .558.018.682.154.035.038 1.337 1.999 2.895 4.361a10760.433 10760.433 0 0 0 4.735 7.17l1.9 2.879.096-.063a12.317 12.317 0 0 0 2.466-2.163 11.944 11.944 0 0 0 2.824-6.134c.096-.66.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747C23.573 4.44 20.365.654 16.014.25A18.9 18.9 0 0 0 11.572 0z"/></svg>`,

    tailwind: `<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z"/></svg>`,

    framer: `<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z"/></svg>`,

    flutter: `<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M14.314 0L2.3 12 6 15.7 21.684.013h-7.37zm.014 11.072L7.857 17.53l6.47 6.47H21.7l-6.46-6.468 6.46-6.46h-7.37z"/></svg>`,

    android: `<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M17.523 15.341a.8.8 0 0 1-.8-.8V9.4a.8.8 0 0 1 1.6 0v5.141a.8.8 0 0 1-.8.8m-11.046 0a.8.8 0 0 1-.8-.8V9.4a.8.8 0 0 1 1.6 0v5.141a.8.8 0 0 1-.8.8M8.13 4.63l-1.21-2.1a.253.253 0 0 0-.341-.093.249.249 0 0 0-.093.34l1.222 2.118A7.27 7.27 0 0 0 4.8 9.1h14.4a7.27 7.27 0 0 0-2.908-4.204l1.222-2.118a.249.249 0 0 0-.434-.248L15.87 4.63A7.17 7.17 0 0 0 12 3.6a7.17 7.17 0 0 0-3.87 1.03M9.9 7a.6.6 0 1 1 0-1.2A.6.6 0 0 1 9.9 7m4.2 0a.6.6 0 1 1 0-1.2.6.6 0 0 1 0 1.2M4.8 17.3A1.7 1.7 0 0 0 6.5 19h.9v3.2a.8.8 0 0 0 1.6 0V19h3v3.2a.8.8 0 0 0 1.6 0V19h.9a1.7 1.7 0 0 0 1.7-1.7V9.4H4.8z"/></svg>`,

    nodejs: `<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M11.998 24a2.04 2.04 0 0 1-1.02-.27l-3.237-1.916c-.483-.27-.247-.366-.088-.422.645-.224.775-.275 1.463-.666.072-.041.167-.025.241.017l2.487 1.476c.09.049.218.049.301 0l9.69-5.596c.09-.052.148-.156.148-.264V7.641c0-.11-.058-.214-.151-.267l-9.688-5.59c-.089-.052-.207-.052-.296 0L2.96 7.374c-.095.053-.154.159-.154.267v11.19c0 .107.059.212.152.263l2.654 1.533c1.441.72 2.322-.128 2.322-.984V8.573c0-.157.125-.281.282-.281h1.23c.154 0 .282.124.282.281v11.07c0 1.927-1.05 3.034-2.876 3.034-.562 0-1.004 0-2.238-.608L1.735 20.52A2.045 2.045 0 0 1 .714 18.74V7.641c0-.727.388-1.406 1.02-1.77l9.69-5.596a2.118 2.118 0 0 1 2.048 0l9.69 5.596c.632.364 1.02 1.043 1.02 1.77v11.1c0 .726-.388 1.405-1.02 1.769l-9.69 5.596c-.315.18-.674.27-1.02.27-.345 0-.705-.09-1.02-.27"/></svg>`,

    express: `<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M24 18.588a1.529 1.529 0 0 1-1.895-.72l-3.45-4.771-.5-.667-4.003 5.444a1.466 1.466 0 0 1-1.944.666l5.232-7.121-4.913-6.303a1.485 1.485 0 0 1 1.946.6l3.5 4.571 3.503-4.571a1.49 1.49 0 0 1 1.946-.6l-1.862 2.368-3.144 4.066 5.544 7.528zm-12.836-9.327c-.408-.109-.82-.221-1.23-.332L8.14 11.35a43.117 43.117 0 0 1-3.066-1.065 7.507 7.507 0 0 1-1.44-.72c-.35-.252-.63-.56-.839-.916a2.22 2.22 0 0 1-.305-1.147c0-.617.16-1.135.482-1.556.322-.42.78-.75 1.378-.99.598-.24 1.301-.36 2.11-.36.772 0 1.472.119 2.1.356.629.238 1.12.596 1.476 1.074.355.479.533 1.07.533 1.774h-1.917c-.026-.469-.192-.832-.5-1.089-.307-.257-.734-.386-1.28-.386-.534 0-.94.097-1.218.289-.278.193-.417.455-.417.787 0 .24.08.447.24.62.16.174.395.33.707.468.312.139.68.265 1.1.38l.862.228c.822.216 1.504.468 2.044.757.541.289.941.638 1.2 1.048.26.41.39.916.39 1.516 0 .638-.168 1.177-.507 1.616-.338.44-.81.776-1.415 1.01-.604.234-1.31.351-2.116.351-.836 0-1.574-.126-2.214-.376-.64-.25-1.143-.629-1.509-1.137-.366-.508-.555-1.134-.569-1.876h1.933c.024.502.18.893.468 1.172.288.279.697.418 1.225.418.562 0 .996-.105 1.302-.315.305-.21.458-.5.458-.869 0-.284-.09-.518-.27-.703-.179-.184-.442-.342-.788-.474a14.75 14.75 0 0 0-1.196-.368z"/></svg>`,

    postgres: `<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M17.128 0a10.134 10.134 0 0 0-2.755.403C13.62.27 12.664.2 11.648.2c-2.047 0-3.862.617-5.123 1.684-.229-.041-.459-.071-.689-.071C3.527 1.813 2 3.518 2 5.733v13.824c0 2.214 1.527 3.618 3.836 3.618h.148c.499.04 1.003.064 1.51.064 1.26 0 2.474-.169 3.547-.46 1.073.291 2.287.46 3.547.46.507 0 1.011-.024 1.51-.064h.148c2.309 0 3.836-1.404 3.836-3.618V5.733c0-2.215-1.527-4.044-3.954-4.044zM12 1.5c.68 0 1.345.068 1.977.186A8.6 8.6 0 0 0 12 1.5zM5.836 22.44c-1.713 0-2.836-.955-2.836-2.618V5.733c0-1.664 1.123-2.92 2.836-2.92.246 0 .49.03.731.085A7.72 7.72 0 0 0 4 8.5c0 4.418 3.574 8 7.98 8h.04c4.406 0 7.98-3.582 7.98-8 0-2.001-.736-3.83-1.95-5.236.248 1.002.38 2.055.38 3.136v13.223c0 1.663-1.123 2.617-2.836 2.617h-.112a24.7 24.7 0 0 1-1.496.062c-1.205 0-2.363-.161-3.383-.44-1.02.279-2.178.44-3.383.44-.499 0-.996-.022-1.496-.062H5.836z"/></svg>`,

    supabase: `<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M11.9 1.036c-.015-.986-1.26-1.41-1.874-.637L.764 12.05C.131 12.888.71 14.064 1.764 14.064h9.781l.354 8.9c.015.986 1.26 1.41 1.874.637l9.262-11.652c.633-.837.054-2.013-1-2.013h-9.781l-.354-8.9z"/></svg>`,

    firebase: `<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M3.89 15.673L6.255.461A.542.542 0 0 1 7.27.288l2.543 4.771zm16.794 3.692l-2.25-14a.54.54 0 0 0-.919-.295L3.316 19.365l7.856 4.427a1.621 1.621 0 0 0 1.588 0zM14.3 7.147l-1.82-3.482a.542.542 0 0 0-.96 0L3.53 17.984z"/></svg>`,

    aws: `<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M6.763 10.036c0 .296.032.535.088.71.064.176.144.368.256.576.04.063.056.127.056.183 0 .08-.048.16-.152.24l-.503.335a.383.383 0 0 1-.208.072c-.08 0-.16-.04-.239-.112a2.47 2.47 0 0 1-.287-.375 6.18 6.18 0 0 1-.248-.471c-.622.734-1.405 1.101-2.347 1.101-.67 0-1.205-.191-1.596-.574-.391-.384-.59-.894-.59-1.533 0-.678.239-1.23.726-1.644.487-.415 1.133-.623 1.955-.623.272 0 .551.024.846.064.296.04.6.104.918.176v-.583c0-.607-.127-1.03-.375-1.277-.255-.248-.686-.367-1.3-.367-.28 0-.568.031-.863.103-.295.072-.583.16-.862.272a2.287 2.287 0 0 1-.28.104.488.488 0 0 1-.127.023c-.112 0-.168-.08-.168-.247v-.391c0-.128.016-.224.056-.28a.597.597 0 0 1 .224-.167c.279-.144.614-.264 1.005-.36a4.84 4.84 0 0 1 1.246-.151c.95 0 1.644.216 2.091.647.439.43.662 1.085.662 1.963v2.586zm-3.24 1.214c.263 0 .534-.048.822-.144.287-.096.543-.271.758-.51.128-.152.224-.32.272-.512.047-.191.08-.423.08-.694v-.335a6.66 6.66 0 0 0-.735-.136 6.02 6.02 0 0 0-.75-.048c-.535 0-.926.104-1.19.32-.263.215-.39.518-.39.917 0 .375.095.655.295.846.191.2.47.296.838.296zm6.41.862c-.144 0-.24-.024-.304-.08-.063-.048-.12-.16-.167-.311L7.586 5.55a1.398 1.398 0 0 1-.072-.32c0-.128.064-.2.191-.2h.783c.151 0 .255.025.31.08.065.048.113.16.16.312l1.342 5.284 1.245-5.284c.04-.16.088-.264.151-.312a.549.549 0 0 1 .32-.08h.638c.152 0 .256.025.32.08.063.048.12.16.151.312l1.261 5.348 1.381-5.348c.048-.16.104-.264.16-.312a.52.52 0 0 1 .311-.08h.743c.127 0 .2.065.2.2 0 .04-.009.08-.017.128a1.137 1.137 0 0 1-.056.2l-1.923 6.17c-.048.16-.104.263-.168.311a.51.51 0 0 1-.303.08h-.687c-.151 0-.255-.024-.32-.08-.063-.056-.119-.16-.15-.32l-1.238-5.148-1.23 5.14c-.04.16-.087.264-.15.32-.065.056-.177.08-.32.08zm10.256.215c-.415 0-.83-.048-1.229-.143-.399-.096-.71-.2-.918-.32-.128-.071-.215-.151-.247-.223a.563.563 0 0 1-.048-.224v-.407c0-.167.064-.247.183-.247.048 0 .096.008.144.024.048.016.12.048.2.08.271.12.566.215.878.279.319.064.63.096.95.096.502 0 .894-.088 1.165-.264a.86.86 0 0 0 .415-.758.777.777 0 0 0-.215-.559c-.144-.151-.415-.287-.806-.415l-1.157-.358c-.583-.183-1.014-.454-1.277-.813a1.902 1.902 0 0 1-.4-1.158c0-.335.073-.63.216-.886.144-.255.335-.479.575-.654.24-.184.51-.32.814-.415.304-.096.623-.144.95-.144.168 0 .343.008.51.024.175.016.335.048.487.08.144.04.28.08.407.127.128.048.224.096.296.144a.605.605 0 0 1 .208.183.506.506 0 0 1 .048.23v.375c0 .168-.064.256-.184.256a.83.83 0 0 1-.303-.096 3.652 3.652 0 0 0-1.532-.311c-.455 0-.815.071-1.062.223-.248.152-.375.383-.375.71 0 .224.08.416.24.567.159.152.454.304.877.44l1.134.358c.574.184.988.44 1.237.767.247.327.371.7.371 1.109 0 .343-.072.655-.207.926-.144.272-.336.511-.583.703-.248.2-.543.343-.886.447-.36.111-.734.167-1.142.167z"/><path d="M20.783 19.955c-2.515 1.86-6.17 2.847-9.315 2.847-4.406 0-8.374-1.628-11.373-4.335-.236-.215-.024-.507.26-.34 3.239 1.884 7.244 3.016 11.381 3.016 2.791 0 5.862-.58 8.685-1.78.424-.18.783.28.362.592z"/><path d="M21.87 18.677c-.32-.415-2.124-.199-2.938-.1-.247.031-.285-.184-.063-.34 1.437-1.01 3.796-.718 4.07-.38.273.344-.072 2.703-1.421 3.83-.207.176-.404.08-.312-.144.304-.76.983-2.455.664-2.866z"/></svg>`,

    python: `<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M11.914 0C5.82 0 6.2 2.656 6.2 2.656l.007 2.752h5.814v.826H3.964S0 5.789 0 11.969c0 6.18 3.403 5.963 3.403 5.963h2.031v-2.867s-.109-3.402 3.35-3.402h5.766s3.24.052 3.24-3.13V3.19S18.28 0 11.914 0zm-3.21 1.856a1.046 1.046 0 1 1 0 2.092 1.046 1.046 0 0 1 0-2.092z"/><path d="M12.086 24c6.094 0 5.714-2.656 5.714-2.656l-.007-2.752H12v-.826h8.057S24 18.211 24 12.031c0-6.18-3.403-5.963-3.403-5.963h-2.031v2.867s.109 3.402-3.35 3.402H9.45s-3.24-.052-3.24 3.13v5.343S5.72 24 12.086 24zm3.21-1.856a1.046 1.046 0 1 1 0-2.092 1.046 1.046 0 0 1 0 2.092z"/></svg>`,

    pandas: `<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M9.327 7.027H7.904v3.93h1.423V7.027zm5.077 0H12.98v3.93h1.424V7.027zM9.327 13.39H7.904v3.583h1.423V13.39zm5.077 0H12.98v3.583h1.424V13.39zM8.615 0C7.684 0 6.9.784 6.9 1.714v2.059H5.227C4.296 3.773 3.5 4.557 3.5 5.488v13.023C3.5 19.44 4.284 20.227 5.227 20.227H6.9v2.059C6.9 23.216 7.684 24 8.615 24c.93 0 1.715-.784 1.715-1.714v-2.059h3.34v2.059C13.67 23.216 14.454 24 15.384 24c.93 0 1.715-.784 1.715-1.714v-2.059h1.673c.93 0 1.727-.787 1.727-1.716V5.488c0-.931-.796-1.715-1.727-1.715H17.1V1.714C17.1.784 16.315 0 15.384 0c-.93 0-1.715.784-1.715 1.714v2.059H10.33V1.714C10.33.784 9.546 0 8.615 0zm-3.388 5.5h13.546v13H5.227V5.5z"/></svg>`,

    sklearn: `<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 1.5a8.5 8.5 0 1 1 0 17 8.5 8.5 0 0 1 0-17zm0 2a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zm0 2a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9z"/></svg>`,

    openai: `<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.032.067L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0L4.252 14.39A4.501 4.501 0 0 1 2.34 7.896zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.566 2.637a4.5 4.5 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.383-.713zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.566-2.632a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z"/></svg>`,

    anthropic: `<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M13.827 3.52h3.603L24 20.16h-3.603l-6.57-16.64zM6.396 3.52L0 20.16h3.667l1.336-3.637h6.638l1.337 3.637h3.667L10.249 3.52H6.396zm-.401 10.061l2.43-6.609 2.43 6.609H5.995z"/></svg>`,

    github: `<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>`,

    googlegemini: `<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zm0 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zm0 3c-3.866 0-7 3.134-7 7s3.134 7 7 7 7-3.134 7-7-3.134-7-7-7zm0 2a5 5 0 1 1 0 10A5 5 0 0 1 12 7z"/></svg>`,

    huggingface: `<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 0a12 12 0 1 0 0 24A12 12 0 0 0 12 0zm0 2a10 10 0 1 1 0 20A10 10 0 0 1 12 2zm-2 6a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm4 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-4.5 7c.5 2 2 3 2.5 3s2-.5 2.5-3"/></svg>`,
};

// ── Skill logo component using inline SVG ───────────────────────────
function SkillLogo({ id, color }: { id: string; color: string }) {
    const svg = LOGOS[id];
    if (!svg) {
        return (
            <span className="text-xs font-bold uppercase" style={{ color }}>
                {id.slice(0, 2)}
            </span>
        );
    }
    return (
        <span
            style={{ color, width: 22, height: 22, display: "flex", alignItems: "center", justifyContent: "center" }}
            dangerouslySetInnerHTML={{ __html: svg }}
        />
    );
}

// ── Domain data — AGENTIC AI first, AI DATA second ──────────────────
const DOMAINS = [
    {
        tag: "AGENTIC_AI_STK",
        color: "#f97316",
        glow: "rgba(249,115,22,0.12)",
        skills: [
            { name: "Claude / Opus", sub: "Anthropic, Tool Use", logo: "anthropic" },
            { name: "Gemini / GLM", sub: "Google AI, Multimodal", logo: "googlegemini" },
            { name: "Claude Code", sub: "Agentic Coding, CLI", logo: "anthropic" },
            { name: "GitHub Copilot", sub: "AI Pair Programming", logo: "github" },
            { name: "Prompt Eng.", sub: "Chain-of-Thought, RAG", logo: "openai" },
            { name: "HuggingFace", sub: "Models, Spaces, Datasets", logo: "huggingface" },
        ],
    },
    {
        tag: "AI_DATA_STK",
        color: "#a78bfa",
        glow: "rgba(167,139,250,0.12)",
        skills: [
            { name: "Python", sub: "Scripting, Automation", logo: "python" },
            { name: "Pandas", sub: "DataFrames, Analysis", logo: "pandas" },
            { name: "Scikit-learn", sub: "ML, Classification", logo: "sklearn" },
            { name: "OpenAI API", sub: "GPT, Embeddings, Tools", logo: "openai" },
        ],
    },
    {
        tag: "FRONTEND_STK",
        color: "#3b82f6",
        glow: "rgba(59,130,246,0.12)",
        skills: [
            { name: "React", sub: "Hooks, Context, Redux", logo: "react" },
            { name: "Next.js", sub: "App Router, SSR, API", logo: "nextjs" },
            { name: "Tailwind CSS", sub: "Responsive, Themes", logo: "tailwind" },
            { name: "Framer Motion", sub: "Animations, Gestures", logo: "framer" },
        ],
    },
    {
        tag: "MOBILE_STK",
        color: "#06b6d4",
        glow: "rgba(6,182,212,0.12)",
        skills: [
            { name: "Flutter", sub: "Cross-platform, Dart", logo: "flutter" },
            { name: "Android Studio", sub: "Native, Kotlin", logo: "android" },
        ],
    },
    {
        tag: "BACKEND_STK",
        color: "#34d399",
        glow: "rgba(52,211,153,0.12)",
        skills: [
            { name: "Node.js", sub: "Express, APIs, Auth", logo: "nodejs" },
            { name: "Express.js", sub: "RESTful APIs, Middleware", logo: "express" },
            { name: "PostgreSQL", sub: "Queries, Relations", logo: "postgres" },
            { name: "Supabase", sub: "Auth, Realtime, Storage", logo: "supabase" },
            { name: "Firebase", sub: "Firestore, Functions", logo: "firebase" },
            { name: "AWS", sub: "EC2, S3, Lambda", logo: "aws" },
        ],
    },
];

// ── Skill card — no level bar ────────────────────────────────────────
function SkillCard({
    skill,
    index,
    color,
    glow,
}: {
    skill: { name: string; sub: string; logo: string };
    index: number;
    color: string;
    glow: string;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -4, transition: { duration: 0.25 } }}
            className="group relative rounded-2xl border border-white/[0.05] bg-white/[0.02] p-6 overflow-hidden cursor-default"
            style={{ backdropFilter: "blur(8px)" }}
        >
            {/* Hover glow */}
            <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                style={{ background: `radial-gradient(ellipse at top left, ${glow}, transparent 70%)` }}
            />
            {/* Top border highlight */}
            <div
                className="absolute top-0 left-6 right-6 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `linear-gradient(90deg, transparent, ${color}70, transparent)` }}
            />
            {/* Watermark number */}
            <span
                className="absolute top-3 right-4 font-black text-4xl leading-none select-none pointer-events-none"
                style={{ color: "rgba(255,255,255,0.04)", fontFamily: "'Syne', sans-serif" }}
            >
                {String(index + 1).padStart(2, "0")}
            </span>

            <div className="relative z-10 space-y-4">
                {/* Logo box */}
                <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center"
                    style={{ background: glow, border: `1px solid ${color}25` }}
                >
                    <SkillLogo id={skill.logo} color={color} />
                </div>

                {/* Name + sub */}
                <div>
                    <p className="text-white font-bold text-base tracking-tight leading-tight">{skill.name}</p>
                    <p className="text-zinc-600 text-[10px] uppercase tracking-widest mt-0.5">{skill.sub}</p>
                </div>
            </div>
        </motion.div>
    );
}

// ── Domain block ─────────────────────────────────────────────────────
function DomainBlock({ domain, domainIdx }: { domain: typeof DOMAINS[0]; domainIdx: number }) {
    const isAgentic = domain.tag === "AGENTIC_AI_STK";
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: domainIdx * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6"
        >
            <div className="flex items-center gap-3">
                <span
                    className="font-black text-sm tracking-[0.2em] uppercase"
                    style={{ color: domain.color, fontFamily: "'Syne', sans-serif" }}
                >
                    {domain.tag.replace(/_/g, " ")}
                </span>
                {isAgentic && (
                    <span
                        className="px-2 py-0.5 rounded-full text-[9px] uppercase tracking-widest font-bold border"
                        style={{ color: domain.color, borderColor: `${domain.color}40`, background: `${domain.color}10` }}
                    >
                        New
                    </span>
                )}
                <div
                    className="flex-1 h-px"
                    style={{ background: `linear-gradient(90deg, ${domain.color}40, transparent)` }}
                />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {domain.skills.map((skill, i) => (
                    <SkillCard key={skill.name} skill={skill} index={i} color={domain.color} glow={domain.glow} />
                ))}
            </div>
        </motion.div>
    );
}

// ── Main export ──────────────────────────────────────────────────────
export default function Skills() {
    return (
        <section
            id="skills"
            className="relative w-full py-32 md:py-44 px-6 md:px-14 lg:px-24 overflow-hidden bg-[#060606]"
        >
            <div className="absolute top-1/4 left-1/3 h-[600px] w-[600px] bg-blue-500/[0.03] blur-[160px] rounded-full pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 h-[500px] w-[500px] bg-orange-500/[0.03] blur-[140px] rounded-full pointer-events-none" />
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.02]"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)",
                    backgroundSize: "60px 60px",
                }}
            />

            <div className="max-w-6xl mx-auto space-y-20">
                {/* Header */}
                <div className="space-y-6">
                    <motion.div
                        initial={{ opacity: 0, x: -16 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="flex items-center gap-3"
                    >
                        <span className="w-6 h-px bg-emerald-500/60" />
                        <span className="text-[10px] uppercase tracking-[0.22em] text-zinc-600">Skills</span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="font-black tracking-tighter text-white leading-[0.9]"
                        style={{ fontSize: "clamp(2.8rem, 5.5vw, 5rem)", fontFamily: "'Syne', 'DM Sans', sans-serif" }}
                    >
                        Technical{" "}
                        <span style={{ color: "transparent", WebkitTextStroke: "1px rgba(255,255,255,0.22)" }}>
                            Depth.
                        </span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-base text-zinc-500 font-light max-w-xl leading-relaxed border-l border-zinc-800 pl-5"
                    >
                        Building across the full stack — from pixel-perfect interfaces to scalable backend
                        systems, data pipelines, and agentic AI workflows.
                    </motion.p>
                </div>

                {/* Domains */}
                <div className="space-y-16">
                    {DOMAINS.map((domain, i) => (
                        <DomainBlock key={domain.tag} domain={domain} domainIdx={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}