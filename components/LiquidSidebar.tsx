// liquid-glass-sidebar-item.tsx
"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import Image from "next/image"

interface LiquidGlassSidebarItemProps
    extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    icon?: string
    isActive?: boolean
    glassColor?: string
}

export function LiquidGlassSidebarItem({
    children,
    icon,
    isActive = false,
    glassColor = "#FFCC00",
    className,
    ...props
}: LiquidGlassSidebarItemProps) {
    const toRgba = (hex: string, alpha: number) => {
        const r = parseInt(hex.slice(1, 3), 16)
        const g = parseInt(hex.slice(3, 5), 16)
        const b = parseInt(hex.slice(5, 7), 16)
        return `rgba(${r},${g},${b},${alpha})`
    }

    return (
        <a
            className={cn(
                "relative flex items-center gap-3 py-1 rounded-xl text-sm font-medium cursor-pointer transition-colors",
                isActive ? "text-white" : "text-zinc-500 hover:text-zinc-300 hover:bg-white/5",
                className
            )}
            {...props}
        >
            {isActive && (
                <>
                    <div
                        className="absolute inset-0 rounded-xl overflow-hidden"
                        style={{
                            background: toRgba(glassColor, 0.12),
                            border: `1px solid ${toRgba(glassColor, 0.35)}`,
                            backdropFilter: 'url("#sidebar-glass-filter")',
                            boxShadow: `
                inset 3px 3px 0.5px -3px ${toRgba(glassColor, 0.5)},
                inset -3px -3px 0.5px -3px ${toRgba(glassColor, 0.4)},
                inset 1px 1px 1px -0.5px ${toRgba(glassColor, 0.4)},
                inset -1px -1px 1px -0.5px ${toRgba(glassColor, 0.4)},
                inset 0 0 6px 6px ${toRgba(glassColor, 0.06)},
                0 0 12px ${toRgba(glassColor, 0.12)}
              `,
                        }}
                    >
                        <div
                            className="absolute inset-x-0 top-0 h-1/3 rounded-t-xl"
                            style={{
                                background: "linear-gradient(to bottom, rgba(255,255,255,0.08), transparent)"
                            }}
                        />
                    </div>
                    <SidebarGlassFilter />
                </>
            )}

            {icon && (
                <Image
                    className="relative z-10 shrink-0"
                    src={icon}
                    alt=""
                    width={35}
                    height={35}
                />
            )}

            {
                children ? <span className="relative z-10 text-[16px]">{children}</span> : null
            }
        </a>
    )
}

export function SidebarGlassFilter() {
    return (
        <svg className="hidden absolute">
            <defs>
                <filter
                    id="sidebar-glass-filter"
                    x="0%" y="0%" width="100%" height="100%"
                    colorInterpolationFilters="sRGB"
                >
                    <feTurbulence
                        type="fractalNoise"
                        baseFrequency="0.05 0.05"
                        numOctaves="1"
                        seed="2"
                        result="turbulence"
                    />
                    <feGaussianBlur in="turbulence" stdDeviation="2" result="blurredNoise" />
                    <feDisplacementMap
                        in="SourceGraphic"
                        in2="blurredNoise"
                        scale="40"
                        xChannelSelector="R"
                        yChannelSelector="B"
                        result="displaced"
                    />
                    <feGaussianBlur in="displaced" stdDeviation="2.5" result="finalBlur" />
                    <feComposite in="finalBlur" in2="finalBlur" operator="over" />
                </filter>
            </defs>
        </svg>
    )
}