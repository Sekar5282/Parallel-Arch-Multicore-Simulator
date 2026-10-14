
 // Global State variables
        let currentParallelMode = 'parallel';
        let inspectedComponent = null;
        let timelineInterval = null;
        let pipelineStage = 1;

        // Initialize default view state
        window.addEventListener('load', () => {
            calculateAmdahl();
            switchAppTab('gaming');
            updateInspector('Core 1');
        });

        // Toggle Single vs Parallel Mode in Section 1
        function setParallelMode(mode) {
            currentParallelMode = mode;
            const btnSingle = document.getElementById('btn-mode-single');
            const btnParallel = document.getElementById('btn-mode-parallel');
            const statusText = document.getElementById('why-mode-status');

            const barA = document.getElementById('bar-task-a');
            const barB = document.getElementById('bar-task-b');
            const barC = document.getElementById('bar-task-c');
            const barD = document.getElementById('bar-task-d');

            const valA = document.getElementById('task-a-val');
            const valB = document.getElementById('task-b-val');
            const valC = document.getElementById('task-c-val');
            const valD = document.getElementById('task-d-val');

            if (mode === 'single') {
                btnSingle.className = "px-4 py-2 rounded-lg bg-brand-orange text-gray-950 font-bold shadow-lg transition";
                btnParallel.className = "px-4 py-2 rounded-lg text-gray-400 hover:text-white transition";
                statusText.innerHTML = 'Current Mode: <span class="text-brand-orange font-bold">SINGLE CORE (1 Core Bottleneck)</span>';

                // Sequential cumulative bars
                barA.style.width = '25%';
                barB.style.width = '50%';
                barC.style.width = '75%';
                barD.style.width = '100%';

                valA.innerText = 'Finished in 0.25s';
                valB.innerText = 'Finished in 0.50s (Queued)';
                valC.innerText = 'Finished in 0.75s (Queued)';
                valD.innerText = 'Finished in 1.00s (Queued)';
            } else {
                btnParallel.className = "px-4 py-2 rounded-lg bg-brand-cyan text-gray-950 font-bold shadow-lg transition";
                btnSingle.className = "px-4 py-2 rounded-lg text-gray-400 hover:text-white transition";
                statusText.innerHTML = 'Current Mode: <span class="text-brand-cyan font-bold">PARALLEL (4 Active Cores)</span>';

                // Simultaneous execution bars
                barA.style.width = '25%';
                barB.style.width = '25%';
                barC.style.width = '25%';
                barD.style.width = '25%';

                valA.innerText = 'Finished in 0.25s';
                valB.innerText = 'Finished in 0.25s (Parallel)';
                valC.innerText = 'Finished in 0.25s (Parallel)';
                valD.innerText = 'Finished in 0.25s (Parallel)';
            }
        }

        function inspectComponent(name) {
            updateInspector(name);
        }

        function updateInspector(name) {
            const title = document.getElementById('inspector-title');
            const desc = document.getElementById('inspector-desc');
            const details = document.getElementById('inspector-details');

            const specs = {
                'Core 1': {
                    desc: 'Primary processing unit containing execution pipelines, arithmetic hardware, and L1 cache.',
                    detailHtml: `
                        <div class="p-3 bg-gray-900 rounded-xl border border-gray-800 flex justify-between"><span class="text-gray-400">ALU / FPU Units:</span><span class="text-brand-cyan font-bold">2 ALU, 2 FPU</span></div>
                        <div class="p-3 bg-gray-900 rounded-xl border border-gray-800 flex justify-between"><span class="text-gray-400">L1 Data Cache:</span><span class="text-brand-neonGreen font-bold">32 KB</span></div>
                        <div class="p-3 bg-gray-900 rounded-xl border border-gray-800 flex justify-between"><span class="text-gray-400">L1 Instruction Cache:</span><span class="text-purple-400 font-bold">32 KB</span></div>
                    `
                },
                'Core 2': {
                    desc: 'Secondary active compute core operating in sync with OS scheduler queues.',
                    detailHtml: `
                        <div class="p-3 bg-gray-900 rounded-xl border border-gray-800 flex justify-between"><span class="text-gray-400">Core Clock:</span><span class="text-brand-cyan font-bold">4.2 GHz</span></div>
                        <div class="p-3 bg-gray-900 rounded-xl border border-gray-800 flex justify-between"><span class="text-gray-400">Execution Width:</span><span class="text-brand-neonGreen font-bold">4-wide decode</span></div>
                    `
                },
                'Shared Cache': {
                    desc: 'Shared L2/L3 cache block accessible by all cores to maintain cache coherence across threads.',
                    detailHtml: `
                        <div class="p-3 bg-gray-900 rounded-xl border border-gray-800 flex justify-between"><span class="text-gray-400">Total Capacity:</span><span class="text-brand-cyan font-bold">32 MB L3</span></div>
                        <div class="p-3 bg-gray-900 rounded-xl border border-gray-800 flex justify-between"><span class="text-gray-400">Latency:</span><span class="text-brand-neonGreen font-bold">~12 ns</span></div>
                    `
                },
                'Bus Interconnect': {
                    desc: 'High-speed system fabric interconnect connecting cache lines to memory and I/O controllers.',
                    detailHtml: `
                        <div class="p-3 bg-gray-900 rounded-xl border border-gray-800 flex justify-between"><span class="text-gray-400">Fabric Width:</span><span class="text-brand-cyan font-bold">512-bit Ring</span></div>
                    `
                },
                'Memory Controller': {
                    desc: 'Interfaces directly with system DDR5 RAM modules to handle DMA requests.',
                    detailHtml: `
                        <div class="p-3 bg-gray-900 rounded-xl border border-gray-800 flex justify-between"><span class="text-gray-400">Channels:</span><span class="text-brand-cyan font-bold">Dual Channel DDR5</span></div>
                    `
                }
            };

            const selected = specs[name] || {
                desc: `Detailed hardware specs for ${name}.`,
                detailHtml: `<div class="p-3 bg-gray-900 rounded-xl border border-gray-800 flex justify-between"><span class="text-gray-400">Status:</span><span class="text-brand-cyan font-bold">Active</span></div>`
            };

            title.innerText = name;
            desc.innerText = selected.desc;
            details.innerHTML = selected.detailHtml;
        }

        function calculateAmdahl() {
            const p = parseFloat(document.getElementById('slider-p').value) / 100.0;
            const n = parseInt(document.getElementById('slider-n').value);

            document.getElementById('p-val-display').innerText = Math.round(p * 100) + '%';
            document.getElementById('n-val-display').innerText = n + ' Cores';

            // Amdahl's formula: Speedup = 1 / ((1 - P) + (P / N))
            const speedup = 1.0 / ((1.0 - p) + (p / n));
            const limit = 1.0 / (1.0 - p);

            document.getElementById('result-speedup').innerText = speedup.toFixed(2) + 'x';
            document.getElementById('result-limit').innerText = limit.toFixed(2) + 'x';
        }

        function runTimelineSimulation() {
            resetTimelineSimulation();
            let elapsed = 0;

            const singleBar = document.getElementById('single-progress-bar');
            const multiBar = document.getElementById('multi-progress-bar');

            const singleTimer = document.getElementById('single-core-timer');
            const multiTimer = document.getElementById('multi-core-timer');

            timelineInterval = setInterval(() => {
                elapsed += 0.05;

                // Multicore finishes 4x faster in simulation
                let multiPercent = Math.min(100, (elapsed / 0.5) * 100);
                let singlePercent = Math.min(100, (elapsed / 2.0) * 100);

                multiBar.style.width = multiPercent + '%';
                singleBar.style.width = singlePercent + '%';

                if (multiPercent < 100) {
                    multiTimer.innerText = `Elapsed: ${elapsed.toFixed(2)}s`;
                    document.getElementById('mc-t1').className = "px-2 py-0.5 rounded bg-brand-cyan text-gray-950 font-bold";
                    document.getElementById('mc-t2').className = "px-2 py-0.5 rounded bg-brand-neonGreen text-gray-950 font-bold";
                    document.getElementById('mc-t3').className = "px-2 py-0.5 rounded bg-amber-400 text-gray-950 font-bold";
                    document.getElementById('mc-t4').className = "px-2 py-0.5 rounded bg-purple-400 text-gray-950 font-bold";
                }

                if (singlePercent < 100) {
                    singleTimer.innerText = `Elapsed: ${elapsed.toFixed(2)}s`;
                    // Highlight single core sequentially
                    if (singlePercent < 25) {
                        document.getElementById('sc-t1').className = "p-3 rounded-lg bg-brand-orange text-gray-950 font-bold";
                    } else if (singlePercent < 50) {
                        document.getElementById('sc-t2').className = "p-3 rounded-lg bg-brand-orange text-gray-950 font-bold";
                    } else if (singlePercent < 75) {
                        document.getElementById('sc-t3').className = "p-3 rounded-lg bg-brand-orange text-gray-950 font-bold";
                    } else {
                        document.getElementById('sc-t4').className = "p-3 rounded-lg bg-brand-orange text-gray-950 font-bold";
                    }
                }

                if (singlePercent >= 100 && multiPercent >= 100) {
                    clearInterval(timelineInterval);
                }
            }, 50);
        }

        function resetTimelineSimulation() {
            if (timelineInterval) clearInterval(timelineInterval);
            document.getElementById('single-progress-bar').style.width = '0%';
            document.getElementById('multi-progress-bar').style.width = '0%';
            document.getElementById('single-core-timer').innerText = 'Elapsed: 0.00s';
            document.getElementById('multi-core-timer').innerText = 'Elapsed: 0.00s';

            ['sc-t1', 'sc-t2', 'sc-t3', 'sc-t4'].forEach(id => {
                document.getElementById(id).className = "p-3 rounded-lg bg-gray-800 text-gray-500";
            });

            ['mc-t1', 'mc-t2', 'mc-t3', 'mc-t4'].forEach(id => {
                document.getElementById(id).className = "px-2 py-0.5 rounded bg-gray-800 text-gray-500";
            });
        }

        function dispatchSchedulerTasks() {
            const slots = [
                document.getElementById('core-slot-1'),
                document.getElementById('core-slot-2'),
                document.getElementById('core-slot-3'),
                document.getElementById('core-slot-4')
            ];

            slots.forEach((slot, idx) => {
                const status = slot.querySelector('.slot-status');
                status.innerText = `RUNNING TASK ${idx + 1}`;
                status.className = "slot-status text-brand-neonGreen font-bold animate-pulse";
                setTimeout(() => {
                    status.innerText = "COMPLETED";
                    status.className = "slot-status text-brand-cyan";
                }, 1500 + idx * 300);
            });
        }

        function selectPipelineStage(stage) {
            pipelineStage = stage;
            for (let i = 1; i <= 5; i++) {
                const card = document.getElementById(`pipe-card-${i}`);
                if (i === stage) {
                    card.className = "cursor-pointer glass-panel p-4 rounded-2xl border-2 border-brand-cyan transition text-center scale-105";
                } else {
                    card.className = "cursor-pointer glass-panel p-4 rounded-2xl border border-gray-800 transition text-center hover:scale-105";
                }
            }

            const titles = ["1. Program Starts", "2. Task Creation", "3. Scheduling", "4. Parallel Execution", "5. Results Combine"];
            const descs = [
                "A program or multiple programs are started by the operating system.",
                "The program is divided into smaller independent sub-tasks or worker threads.",
                "OS Scheduler assigns created tasks to available idle CPU cores.",
                "Cores execute tasks simultaneously in parallel compute cycles.",
                "Individual core outputs are synchronized and combined into final output."
            ];

            document.getElementById('pipe-stage-label').innerText = `STAGE ${stage} IN FOCUS`;
            document.getElementById('pipe-stage-title').innerText = titles[stage - 1];
            document.getElementById('pipe-stage-desc').innerText = descs[stage - 1];
        }

        function playPipelineAnimation() {
            let current = 1;
            const timer = setInterval(() => {
                selectPipelineStage(current);
                current++;
                if (current > 5) clearInterval(timer);
            }, 1000);
        }

        function switchAppTab(appKey) {
            const tabs = ['gaming', 'video', 'ai', 'cad', 'server'];
            tabs.forEach(t => {
                const btn = document.getElementById(`tab-${t}`);
                if (t === appKey) {
                    btn.className = "app-tab px-4 py-2 rounded-xl bg-brand-cyan text-gray-950 font-bold transition";
                } else {
                    btn.className = "app-tab px-4 py-2 rounded-xl bg-gray-900 text-gray-300 hover:text-white transition";
                }
            });

            const area = document.getElementById('app-content-area');
            const data = {
                gaming: {
                    title: "Gaming & Real-time Physics",
                    desc: "Smoother gameplay and real-time rendering. Multicore offloads physics, AI pathfinding, and frame rendering to separate threads.",
                    metricName: "Simulated FPS Benchmark",
                    singleVal: "45 FPS (Single Core)",
                    multiVal: "144 FPS (Octa Core)"
                },
                video: {
                    title: "Video Editing & Encoding",
                    desc: "Faster 4K/8K rendering and encoding. Video frames are partitioned across cores for parallel export.",
                    metricName: "Render Export Time",
                    singleVal: "18.5 Minutes",
                    multiVal: "2.8 Minutes"
                },
                ai: {
                    title: "AI & Machine Learning",
                    desc: "Train large neural network models efficiently through matrix tensor multiplications distributed across cores.",
                    metricName: "Training Speedup",
                    singleVal: "1.0x Baseline",
                    multiVal: "7.8x Parallel"
                },
                cad: {
                    title: "3D Modeling & CAD",
                    desc: "Handle complex polygon raytracing simulations and mechanical structural stress analysis.",
                    metricName: "Poly Simulation Time",
                    singleVal: "120 Seconds",
                    multiVal: "18 Seconds"
                },
                server: {
                    title: "Servers & Cloud Infrastructure",
                    desc: "Handle thousands of incoming HTTP requests simultaneously without thread blocking.",
                    metricName: "Requests Per Second (RPS)",
                    singleVal: "1,200 RPS",
                    multiVal: "25,000 RPS"
                }
            };

            const item = data[appKey];
            area.innerHTML = `
                <div>
                    <h3 class="text-2xl font-black text-white mb-2 font-mono">${item.title}</h3>
                    <p class="text-sm text-gray-300 leading-relaxed mb-6">${item.desc}</p>
                    <div class="p-4 bg-gray-950 rounded-2xl border border-gray-800">
                        <span class="text-xs text-gray-400 font-mono block mb-1">${item.metricName}</span>
                        <div class="text-xl font-bold text-brand-neonGreen font-mono">${item.multiVal}</div>
                    </div>
                </div>
                <div class="p-6 bg-gray-950 rounded-3xl border border-gray-800 text-center space-y-4 font-mono">
                    <div class="p-3 bg-gray-900 rounded-xl flex justify-between text-xs">
                        <span class="text-gray-400">Single Core:</span>
                        <span class="text-brand-orange font-bold">${item.singleVal}</span>
                    </div>
                    <div class="p-3 bg-gray-900 rounded-xl flex justify-between text-xs border border-brand-cyan">
                        <span class="text-gray-400">Multicore Parallel:</span>
                        <span class="text-brand-cyan font-bold">${item.multiVal}</span>
                    </div>
                </div>
            `;
        }

        function runRaceCondition(useLock) {
            const display = document.getElementById('race-counter-display');
            if (useLock) {
                display.innerText = "10,000 (Thread Safe)";
                display.className = "font-bold text-brand-neonGreen";
            } else {
                // Simulate data corruption race condition
                const corrupted = Math.floor(6000 + Math.random() * 2500);
                display.innerText = `${corrupted} (Data Corrupted!)`;
                display.className = "font-bold text-red-400";
            }
        }

        function toggleFanTurbo() {
            const tempText = document.getElementById('temp-display');
            const fanText = document.getElementById('fan-speed-text');
            const bar = document.getElementById('temp-bar');

            tempText.innerText = "32 °C";
            fanText.innerText = "4800 RPM (Turbo)";
            bar.style.width = "32%";
        }
