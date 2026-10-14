# 🚀 Parallel Architecture & Multicore Simulator

## 🌐 Live Demo

👉 **[Click Here to View the Live Demo](https://sekar5282.github.io/Parallel-Arch-Multicore-Simulator/)**

Explore an interactive simulation of multicore CPU architecture and learn how parallel processing improves computational performance.

---

## 📌 About the Project

The **Parallel Architecture & Multicore Simulator** is an interactive educational web application designed to demonstrate the fundamental concepts of computer architecture, multicore processors, and parallel computing.

The project helps students and technology enthusiasts understand how multiple CPU cores execute tasks, how operating systems schedule workloads, and how parallel execution can reduce processing time.

Through interactive visualizations and simulations, users can explore CPU components, compare single-core and multicore execution, understand task scheduling, and experiment with Amdahl's Law.

## 🎯 Objectives

- Understand the fundamentals of parallel processing and multicore architecture.
- Visualize the differences between sequential and parallel task execution.
- Explore CPU cores, shared cache, bus interconnects, and memory controllers.
- Demonstrate task scheduling and workload distribution.
- Calculate theoretical speedup using Amdahl's Law.
- Understand race conditions and the importance of synchronization.
- Explore how multicore processing can benefit real-world applications.

## ✨ Features

### 1. 🖥️ Single-Core vs. Multicore Processing
Compare sequential task execution on a single core with simultaneous execution across multiple cores using interactive visualizations.

### 2. ⚙️ CPU Architecture Explorer
Explore important CPU components, including:
- CPU cores
- Shared cache
- Bus interconnect
- Memory controller

Select components to view their descriptions and illustrative hardware specifications.

### 3. 📊 Amdahl's Law Calculator
Experiment with the percentage of parallelizable code and the number of CPU cores to calculate theoretical speedup.

The simulator uses the formula:

**Speedup = 1 / ((1 − P) + (P / N))**

Where:
- `P` = Parallelizable fraction of the program.
- `N` = Number of processing cores.

### 4. ⏱️ Execution Timeline Simulation
Visualize simulated task execution and compare the progress of single-core and multicore workloads.

### 5. 🗓️ Task Scheduling Simulation
Explore how an operating system scheduler can distribute tasks among available CPU cores and visualize task completion.

### 6. 🔄 Pipeline Execution Visualization
Follow the major stages of parallel task execution:
1. Program starts.
2. Tasks are created.
3. Tasks are scheduled.
4. Tasks execute in parallel.
5. Results are combined.

### 7. 💻 Real-World Applications
Explore illustrative multicore computing scenarios in:
- Gaming and real-time physics
- Video editing and encoding
- Artificial intelligence and machine learning
- 3D modeling and computer-aided design (CAD)
- Servers and cloud infrastructure

### 8. 🔒 Race Condition Demonstration
Understand how concurrent operations can produce incorrect results when shared data is not properly synchronized, and how synchronization can help protect shared state.

## 🛠️ Technologies Used

- **HTML5** — Web page structure and content.
- **CSS3** — Styling, layout, and visual presentation.
- **JavaScript** — Interactive controls, calculations, and simulations.
- **GitHub Pages** — Static website hosting.

## 📂 Project Structure

```text
multicore-simulator/
│
├── index.html       # Main website structure
├── style.css        # Website styling
├── script.js        # Interactive functionality
└── README.md        # Project documentation
```

## 🚀 Getting Started

### Run Locally

1. Clone the repository:

   ```bash
   git clone https://github.com/Sekar5282/multicore-simulator.git
   ```

2. Open the project folder:

   ```bash
   cd multicore-simulator
   ```

3. Open `index.html` in your web browser.

No backend server is required for the static website.

### Deploy with GitHub Pages

1. Push `index.html`, `style.css`, and `script.js` to the repository.
2. Open the repository's **Settings**.
3. Select **Pages**.
4. Choose **Deploy from a branch**.
5. Select the `main` branch and the `/ (root)` folder.
6. Save the settings and wait for deployment to complete.

Once deployed, access the website through the Live Demo link at the top of this README.

## 📚 Educational Value

This project provides a visual introduction to important computer science concepts, including parallel computing, CPU architecture, concurrency, workload scheduling, synchronization, and theoretical performance scaling.

It can be used as a learning resource for computer science students, engineering students, and anyone interested in understanding multicore processor technology.

## ⚠️ Disclaimer

This project is an educational simulator. Performance values, hardware specifications, benchmark comparisons, and execution timings displayed by the interface are illustrative unless explicitly measured on real hardware. They should not be interpreted as guaranteed real-world benchmark results.

## 🔮 Future Enhancements

Potential improvements include:
- Configurable numbers of CPU cores.
- More detailed cache-coherence visualizations.
- User-defined workloads and task dependencies.
- More realistic scheduling algorithms.
- Exportable simulation results and performance charts.
- Additional concurrency and synchronization examples.

## 👨‍💻 Author

**Sekar5282**

GitHub: [https://github.com/Sekar5282](https://github.com/Sekar5282)

## 📄 License

This project is available for educational and learning purposes. Add a `LICENSE` file to specify the terms under which others may use, modify, and distribute the code.

---

⭐ If you find this project useful, consider giving the repository a star!

🔗 **Live Demo:** https://sekar5282.github.io/Parallel-Arch-Multicore-Simulator/
