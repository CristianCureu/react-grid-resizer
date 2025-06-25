import type { ColumnConfig, ConfigItem, ConfigKey } from "@src/types/index";
import { useColumnConfig } from "@context/ColumnConfigProvider";
import { useState } from "react";


type ColumnResizerOptions<T extends ColumnConfig<string>> = {
    context: ConfigKey<T>;
    minWidth?: number;
    maxWidth?: number;
};

type ColumnResizerReturn<T extends ColumnConfig<string>> = {
    getContextConfig: (context: ConfigKey<T>) => readonly ConfigItem[];
    resizePreviewLeft: number | null;
    startResize: (args: {
        e: React.MouseEvent;
        colId: string;
        colElement: HTMLElement;
    }) => void;
    resizeClamped: boolean
};

function useColumnResizer<T extends ColumnConfig<string>>(options: ColumnResizerOptions<T>): ColumnResizerReturn<T> {
    const [resizePreviewLeft, setResizePreviewLeft] = useState<number | null>(null);
    const [resizeClamped, setResizeClamped] = useState<boolean>(false);
    const { getContextConfig, setWidth } = useColumnConfig<ConfigKey<T>>();

    const { context, minWidth = 50, maxWidth = 500 } = options;

    const startResize = (
        { e, colId, colElement }:
            { e: React.MouseEvent, colId: string, colElement: HTMLElement }
    ) => {
        const startX = e.clientX;
        const startWidth = colElement.offsetWidth;

        const onMouseMove = (moveEvent: MouseEvent) => {
            const delta = moveEvent.clientX - startX;
            const newWidth = startWidth + delta;

            const clamped = newWidth <= minWidth || newWidth >= maxWidth;
            setResizeClamped(clamped);

            if (newWidth < minWidth) {
                setResizePreviewLeft(startX - (startWidth - minWidth));
            } else if (newWidth > maxWidth) {
                setResizePreviewLeft(startX - (startWidth - maxWidth));
            } else {
                setResizePreviewLeft(moveEvent.clientX);
            }
        };


        const onMouseUp = (upEvent: MouseEvent) => {
            const delta = upEvent.clientX - startX;
            const newWidth = startWidth + delta;

            setWidth(context, colId, `${Math.min(maxWidth, Math.max(newWidth, minWidth))}px`);
            setResizePreviewLeft(null);

            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', onMouseUp);
            document.body.classList.remove("noselect");
        };

        setResizePreviewLeft(startX);
        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onMouseUp);
        document.body.classList.add("noselect")
    };

    return {
        getContextConfig,
        resizePreviewLeft,
        startResize,
        resizeClamped
    };
};

export { useColumnResizer }