import React, { useState, useEffect } from 'react';
import { Java } from '@/components/ui/svgs/java';
import { Spring } from '@/components/ui/svgs/spring';
import { Redis } from '@/components/ui/svgs/redis';
import { Docker } from '@/components/ui/svgs/docker';
import { Kubernetes } from '@/components/ui/svgs/kubernetes';
import { Golang } from '@/components/ui/svgs/golang';
import { GolangDark } from '@/components/ui/svgs/golangDark';
import { ReactLight } from '@/components/ui/svgs/reactLight';
import { ReactDark } from '@/components/ui/svgs/reactDark';
import { Nodejs } from '@/components/ui/svgs/nodejs';
import { ApacheKafkaDark } from '@/components/ui/svgs/apacheKafkaDark';
import { ApacheKafkaLight } from '@/components/ui/svgs/apacheKafkaLight';
import { Grafana } from '@/components/ui/svgs/grafana';
import { Btc } from '@/components/ui/svgs/btc';
import { AwsLight } from '@/components/ui/svgs/awsLight';
import { AwsDark } from '@/components/ui/svgs/awsDark';
import { ClaudeAiIcon } from '@/components/ui/svgs/claudeAiIcon';
import { Copilot } from '@/components/ui/svgs/copilot';
import { CopilotDark } from '@/components/ui/svgs/copilotDark';
import { Gemini } from '@/components/ui/svgs/gemini';

interface TechBadgeProps {
    name: string;
}

// Map of technology names to their SVGL components (with light/dark variants)
const techIcons: Record<string, { light?: React.ComponentType<any>; dark?: React.ComponentType<any>; default?: React.ComponentType<any> }> = {
    "Java": { default: Java },
    "Java 21": { default: Java },
    "Java 17": { default: Java },
    "Spring Boot": { default: Spring },
    "Spring Boot 3.x": { default: Spring },
    "Spring WebFlux": { default: Spring },
    "Redis": { default: Redis },
    "Docker": { default: Docker },
    "Kubernetes": { default: Kubernetes },
    "Go": { light: Golang, dark: GolangDark },
    "ReactJs": { light: ReactDark, dark: ReactLight },
    "React": { light: ReactDark, dark: ReactLight },
    "NodeJs": { default: Nodejs },
    "Node.js": { default: Nodejs },
    "Kafka": { light: ApacheKafkaLight, dark: ApacheKafkaDark },
    "Grafana": { default: Grafana },
    "Blockchain": { default: Btc },
    "AWS": { light: AwsLight, dark: AwsDark },
    "Claude": { default: ClaudeAiIcon },
    "GitHub Copilot": { light: Copilot, dark: CopilotDark },
    "Gemini": { default: Gemini },
};

// Helper to get icon component based on theme
const getIcon = (name: string, theme: string): React.ComponentType<any> | null => {
    const isLightTheme = theme === 'light';

    // Try exact match first
    if (techIcons[name]) {
        const iconSet = techIcons[name];
        if (isLightTheme && iconSet.light) return iconSet.light;
        if (!isLightTheme && iconSet.dark) return iconSet.dark;
        if (iconSet.default) return iconSet.default;
    }

    // Try partial match for versions
    const baseName = Object.keys(techIcons).find(key => name.startsWith(key));
    if (baseName) {
        const iconSet = techIcons[baseName];
        if (isLightTheme && iconSet.light) return iconSet.light;
        if (!isLightTheme && iconSet.dark) return iconSet.dark;
        if (iconSet.default) return iconSet.default;
    }

    return null;
};

export default function TechBadge({ name }: TechBadgeProps) {
    const [showTooltip, setShowTooltip] = useState(false);
    const [currentTheme, setCurrentTheme] = useState('system');

    useEffect(() => {
        // Get initial theme
        const theme = document.documentElement.getAttribute('data-theme') || 'system';
        setCurrentTheme(theme);

        // Watch for theme changes
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'data-theme') {
                    const newTheme = document.documentElement.getAttribute('data-theme') || 'system';
                    setCurrentTheme(newTheme);
                }
            });
        });

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['data-theme']
        });

        return () => observer.disconnect();
    }, []);

    const IconComponent = getIcon(name, currentTheme);

    if (!IconComponent) {
        // Fallback to text badge
        return (
            <span className="rounded bg-text-muted/10 px-2 py-1 text-xs text-text-muted border border-text-muted/20 hover:text-primary hover:border-primary/30 transition-colors cursor-default">
                #{name.toLowerCase().replace(/\s+/g, '-')}
            </span>
        );
    }

    return (
        <div
            className="relative inline-flex"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            onClick={() => setShowTooltip(!showTooltip)}
        >
            <div className="flex items-center justify-center w-10 h-10 md:w-8 md:h-8 rounded-full bg-white/10 border border-text-muted/20 hover:border-primary/50 hover:shadow-[0_0_10px_rgba(0,243,255,0.2)] transition-all cursor-pointer p-1.5">
                <IconComponent width="100%" height="100%" />
            </div>

            {/* Tooltip */}
            {showTooltip && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs text-surface bg-primary rounded whitespace-nowrap pointer-events-none z-20 font-bold">
                    {name}
                    {/* Arrow */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-primary"></div>
                </div>
            )}
        </div>
    );
}
