import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GitCommit, GitBranch, ChevronDown, Terminal, Loader2 } from 'lucide-react';
import TechBadge from './TechBadge';

interface ExperienceItem {
    title: string;
    company: string;
    location: string;
    date: string;
    description?: string;
    responsibilities?: string[];
    technologies?: string[];
}

interface GitLogListProps {
    items: ExperienceItem[];
}

export default function GitLogList({ items }: GitLogListProps) {
    const [visibleCount, setVisibleCount] = useState(4);
    const [isLoading, setIsLoading] = useState(false);

    const showMore = () => {
        setIsLoading(true);
        // Simulate network/processing delay for effect
        setTimeout(() => {
            setVisibleCount(prev => Math.min(prev + 4, items.length));
            setIsLoading(false);
        }, 800);
    };

    const visibleItems = items.slice(0, visibleCount);
    const hasMore = visibleCount < items.length;

    return (
        <div className="relative space-y-8 font-mono">
            {/* Vertical Line */}
            <div className="absolute left-0 top-0 h-full w-8 md:w-10 flex justify-center">
                <div className="h-full w-0.5 bg-text-muted opacity-30"></div>
            </div>

            <AnimatePresence mode="popLayout">
                {visibleItems.map((item, index) => (
                    <motion.div
                        key={`${item.company}-${index}`}
                        layout
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3, delay: index >= 4 ? (index - visibleCount + 4) * 0.1 : 0 }}
                        className="group relative flex gap-3 md:gap-6"
                    >
                        {/* Commit Node */}
                        <div className="relative z-10 flex h-8 w-8 md:h-10 md:w-10 shrink-0 items-center justify-center rounded-full border-2 border-text-muted/50 bg-surface transition-all group-hover:border-primary/50 group-hover:shadow-[0_0_15px_rgba(0,243,255,0.3)]">
                            <GitCommit className="h-4 w-4 md:h-5 md:w-5 text-text-muted transition-colors group-hover:text-primary" />
                        </div>

                        {/* Content */}
                        <div className="flex-1 rounded-lg border border-text-muted/20 bg-surface p-4 md:p-6 transition-all hover:border-primary/30 hover:bg-surface-hover shadow-sm">
                            <div className="mb-2 flex flex-wrap items-center gap-2 md:gap-3 text-xs md:text-sm">
                                <span className="text-primary font-bold">{item.date}</span>
                                <span className="text-text-muted">commit {item.title.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0).toString(16).substring(0, 7)}</span>
                                <div className="flex items-center gap-1 rounded-full bg-secondary/10 px-2 py-0.5 text-xs text-secondary border border-secondary/20">
                                    <GitBranch className="h-3 w-3" />
                                    <span>main</span>
                                </div>
                            </div>

                            <h3 className="text-lg md:text-xl font-bold text-text mb-1 group-hover:text-primary transition-colors">
                                {item.title}
                            </h3>
                            <div className="mb-4 flex items-center gap-2 text-text-muted">
                                <span>@ {item.company}</span>
                                <span>•</span>
                                <span>{item.location}</span>
                            </div>

                            {item.description && (
                                <p className="mb-4 text-text font-sans">{item.description}</p>
                            )}

                            {item.responsibilities && (
                                <div className="space-y-2 border-l-2 border-text-muted/20 pl-4">
                                    {item.responsibilities.map((resp, i) => (
                                        <p key={i} className="text-sm text-text-muted font-sans">+ {resp}</p>
                                    ))}
                                </div>
                            )}

                            <div className="mt-4 flex flex-wrap gap-2">
                                {item.technologies?.map((tech) => (
                                    <TechBadge key={tech} name={tech} />
                                ))}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>

            {/* Load More Button */}
            {hasMore && (
                <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="relative flex gap-3 md:gap-6"
                >
                    <div className="relative z-10 flex h-8 w-8 md:h-10 md:w-10 shrink-0 items-center justify-center">
                        <div className="h-full w-0.5 bg-text-muted opacity-30 absolute top-0 -z-10"></div>
                        <div className="h-2 w-2 rounded-full bg-text-muted/50"></div>
                    </div>

                    <div className="flex-1">
                        <button
                            onClick={showMore}
                            disabled={isLoading}
                            className="group flex items-center gap-3 rounded-lg border border-primary/30 bg-primary/5 px-6 py-3 text-primary transition-all hover:bg-primary/10 hover:border-primary/50 hover:shadow-[0_0_20px_rgba(0,243,255,0.15)] disabled:opacity-50 disabled:cursor-not-allowed w-full md:w-auto"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    <span className="font-mono text-sm">git fetch --more...</span>
                                </>
                            ) : (
                                <>
                                    <Terminal className="h-4 w-4" />
                                    <span className="font-mono text-sm">git log --more</span>
                                    <ChevronDown className="h-4 w-4 transition-transform group-hover:translate-y-1" />
                                </>
                            )}
                        </button>
                    </div>
                </motion.div>
            )}

            {!hasMore && (
                <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="relative flex gap-3 md:gap-6"
                >
                    <div className="relative z-10 flex h-8 w-8 md:h-10 md:w-10 shrink-0 items-center justify-center rounded-full border-2 border-text-muted/50 bg-surface">
                        <div className="h-2 w-2 rounded-full bg-text-muted"></div>
                    </div>
                    <div className="py-2 text-text-muted font-mono text-sm">Initial commit</div>
                </motion.div>
            )}
        </div>
    );
}
