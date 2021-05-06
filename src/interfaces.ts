import { LegacyRef, RefObject } from "react";

export interface Range {
    min: number,
    max: number
}

export interface OPTION {
    name: string,
    property: string,
    value: number,
    range: Range,
    unit: string
}

export interface SidebarProp {
    options: OPTION[]
    selectedOptionIndex: number
    handleClick(i:number): void
}

export interface SliderProp{
    min:number
    max:number
    value:number
    handleChange(e: React.ChangeEvent<HTMLInputElement>): void
}

export interface EditorImageProp{
    fileUrl: string
    options: OPTION[]
    canvasRef: React.RefObject<HTMLCanvasElement>
    contextRef: any
}

export interface SelectImagePageProp{
    canvasRef: React.RefObject<HTMLCanvasElement>
    setFileUrl(src: string):void
}

export interface RightBarProp{
    canvasRef: React.RefObject<HTMLCanvasElement>
    DEFAULT_OPTIONS: OPTION[]
    downloadUrl: string
    setDownloadUrl(url:string):void
    setOptions(option:OPTION[]):void 
}