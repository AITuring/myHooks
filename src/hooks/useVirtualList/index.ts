// import { useState, useEffect, useRef, MutableRefObject } from "react";

// interface Options<T> {
//     containerTarget: (() => Element) | Element | MutableRefObject<Element>;
//     wrapperTarget: (() => Element) | Element | MutableRefObject<Element>;
//     itemHeight: number | ((index: number, data: T) => number);
//     overscan?: number;
// }

// interface Result<T> {
//     list: { data: T; index: number }[];
//     scrollTo: (index: number) => void;
// }

// const useVirtualList = <T>(
//     originalList: T[] = [],
//     options: Options<T>
// ): Result<T> => {
//     const {
//         containerTarget,
//         wrapperTarget,
//         itemHeight,
//         overscan = 5,
//     } = options;

//     const [visibleList, setVisibleList] = useState<
//         { data: T; index: number }[]
//     >([]);
//     const containerRef = useRef<Element | null>(null);
//     const wrapperRef = useRef<Element | null>(null);
//     const scrollTopRef = useRef(0);
//     const totalHeightRef = useRef(0);

//     useEffect(() => {
//         containerRef.current =
//             typeof containerTarget === "function"
//                 ? containerTarget()
//                 : containerTarget.current || containerTarget;
//         wrapperRef.current =
//             typeof wrapperTarget === "function"
//                 ? wrapperTarget()
//                 : wrapperTarget.current || wrapperTarget;

//         const container = containerRef.current;
//         const wrapper = wrapperRef.current;

//         if (!container || !wrapper) return;

//         const getItemHeight = (index: number): number => {
//             return typeof itemHeight === "function"
//                 ? itemHeight(index, originalList[index])
//                 : itemHeight;
//         };

//         const updateVisibleList = () => {
//             const containerHeight = container.clientHeight;
//             const scrollTop = container.scrollTop;
//             scrollTopRef.current = scrollTop;

//             const startIndex = Math.floor(scrollTop / getItemHeight(0));
//             const endIndex = Math.min(
//                 originalList.length - 1,
//                 Math.floor((scrollTop + containerHeight) / getItemHeight(0))
//             );

//             const newVisibleList = [];
//             for (let i = startIndex - overscan; i <= endIndex + overscan; i++) {
//                 if (i >= 0 && i < originalList.length) {
//                     newVisibleList.push({ data: originalList[i], index: i });
//                 }
//             }

//             setVisibleList(newVisibleList);

//             const totalHeight = originalList.reduce(
//                 (sum, _, index) => sum + getItemHeight(index),
//                 0
//             );
//             totalHeightRef.current = totalHeight;
//             wrapper.style.height = `${totalHeight}px`;
//         };

//         updateVisibleList();

//         container.addEventListener("scroll", updateVisibleList);

//         return () => {
//             container.removeEventListener("scroll", updateVisibleList);
//         };
//     }, [containerTarget, wrapperTarget, itemHeight, overscan, originalList]);

//     const scrollTo = (index: number) => {
//         const container = containerRef.current;
//         if (!container) return;

//         const heightBeforeIndex = originalList
//             .slice(0, index)
//             .reduce(
//                 (sum, _, idx) =>
//                     sum +
//                     (typeof itemHeight === "function"
//                         ? itemHeight(idx, originalList[idx])
//                         : itemHeight),
//                 0
//             );

//         container.scrollTop = heightBeforeIndex;
//     };

//     return {
//         list: visibleList,
//         scrollTo,
//     };
// };

// export default useVirtualList;
