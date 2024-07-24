// import { useRef } from "react";
// import { useVirtualList } from "@/hooks";
// import "../demo.css";

// const data = Array.from({ length: 10000 }, (_, i) => `Item ${i}`);

// const VirtualListDemo: React.FC = () => {
//     const containerRef = useRef<HTMLDivElement>(null);
//     const wrapperRef = useRef<HTMLDivElement>(null);

//     const { list, scrollTo } = useVirtualList(data, {
//         containerTarget: containerRef,
//         wrapperTarget: wrapperRef,
//         itemHeight: 30,
//         overscan: 5,
//     });

//     return (
//         <div className="hook">
//             <div className="hook-head">
//                 <h2>useVirtualList</h2>
//             </div>
//             <div className="content">
//                 <button onClick={() => scrollTo(500)}>
//                     Scroll to Item 500
//                 </button>
//                 <div
//                     ref={containerRef}
//                     style={{ height: "300px", overflowY: "auto" }}
//                 >
//                     <div ref={wrapperRef}>
//                         {list.map(({ data, index }) => (
//                             <div
//                                 key={index}
//                                 style={{
//                                     height: "30px",
//                                     display: "flex",
//                                     alignItems: "center",
//                                 }}
//                             >
//                                 {data}
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default VirtualListDemo;
