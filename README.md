# Elevator Simulation Application

Welcome to the Elevator Simulation Application! This is a JavaScript-based simulation of a building with multiple floors and elevators. The application demonstrates the movement of elevators between floors and their door-opening animations.

## Table of Contents

- [Elevator Simulation Application](#elevator-simulation-application)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Features](#features)
  - [Getting Started](#getting-started)
  - [Usage](#usage)
  - [Contributing](#contributing)

## Introduction

The Elevator Simulation Application is a web-based simulation that showcases the movement and behavior of elevators within a building with multiple floors. It offers a visual representation of elevator movement and door-opening animations, providing insights into how elevators operate in a real-world scenario.

## Features

- **Multi-Elevator System:** Simulate a building with multiple elevators that move independently.
- **Floor Buttons:** Users can select floors to request an elevator to a specific location.
- **Elevator Movement:** Elevators move vertically between floors with realistic animation.
- **Door Animations:** Elevator doors open and close with smooth animations.
- **Smart Elevator Selection:** The application intelligently assigns the nearest available elevator to a user's request.
- **Pending Requests:** If all elevators are busy, the application queues pending requests and assigns the nearest available elevator once one becomes available.

## Getting Started

To get started with the Elevator Simulation Application, follow these steps:

1. **Clone the Repository:** Clone this repository to your local machine using the following command:

   ```JavaScript
       git clone https://github.com/khemchand-twt11/Lift_Simulation.git
   ```

2. **Open the HTML File:** Open the `index.html` file in a web browser to launch the simulation.

## Usage

1. **Setting Up:**

- Upon opening the application, you will be prompted to enter the number of floors and elevators in the building.

2. **Simulating Elevator Movement:**

- After setting up, you will see a visualization of the building with elevator cabins.
- Click the up or down buttons next to each floor to request an elevator.
- Observe how the elevators move to fulfill the requests.

3. **Door Animations:**

- As elevators arrive at a floor, their doors will open automatically.
- After a brief pause, the doors will close again.

4. **Smart Elevator Assignment:**

- The application intelligently assigns the nearest available elevator to a user's request.
- If all elevators are busy, the request will be added to the pending queue.

5. **Pending Requests:**

- If multiple requests are made while all elevators are busy, the requests will be queued.
- Once an elevator becomes available, the nearest pending request will be assigned to it.

## Contributing

Contributions are welcome! If you encounter any issues or have suggestions for improvements, please feel free to submit a pull request or open an issue in the repository.
