# Charting Library Example

## Overview

This project is a React.js application that integrates Chart.js to visualize data from a JSON file. It allows users to view data across different timeframes (daily, weekly, monthly) with zooming and interactive click events on data points.

## Features

- **Chart Display**: Visualizes data using Chart.js with support for various timeframes.
- **Timeframe Selection**: Allows users to switch between daily, weekly, and monthly data views.
- **Zooming**: Enables users to zoom in/out on specific time periods for detailed analysis.
- **Interactive Click Events**: Displays detailed information or actions on clicking data points.
- **Responsive UI**: Ensures a seamless experience across devices.

## Tech Stack

- **Frontend**: React.js
- **Charting Library**: Chart.js
- **Data Handling**: Axios for fetching JSON data
- **Styling**: CSS for basic styling

## Setup and Installation

To run this project locally, follow these steps:

1. **Clone the Repository**:
    ```bash
    git clone https://github.com/zjkumar/ReactChart
    cd charting-library
    ```

2. **Install Dependencies**:
    Ensure you have Node.js and npm installed, then run:
    ```bash
    npm install
    ```

3. **Start the Development Server**:
    Start the development server using:
    ```bash
    npm start
    ```
    The app will be available at `http://localhost:3000`.

4. **Build for Production**:
    To build the project for production, use:
    ```bash
    npm run build
    ```
    This will create a `build` directory with the optimized production build.

## Deployment

This project is deployed on Vercel. You can access it [here](https://react-chart-pearl.vercel.app).

## Project Structure

- **src/components/ChartComponent.js**: Component to render the Chart using Chart.js.
- **src/components/TimeframeSelector.js**: Component for selecting different timeframe breakdowns.
- **src/data/data.json**: JSON file containing sample data for the chart.
- **src/styles/App.css**: CSS file for basic styling of the application.
- **src/App.js**: Main component integrating ChartComponent and TimeframeSelector.

## Libraries and Tools

- **React.js**: JavaScript library for building user interfaces.
- **Chart.js**: Simple yet flexible JavaScript charting library.
- **Axios**: Promise-based HTTP client for making API requests.
- **CSS**: Used for basic styling and layout.

## Usage

1. **Viewing the Chart**:
    Upon starting the application, a default chart will be displayed based on the JSON data.

2. **Changing Timeframes**:
    Use the buttons in the TimeframeSelector component to switch between daily, weekly, and monthly views.

3. **Interacting with the Chart**:
    - **Zooming**: Use the mouse wheel to zoom in/out on the chart for more detailed data.
    - **Click Events**: Click on data points to interactively display additional information.

## Future Enhancements

- **Data Filtering**: Implement additional features such as data filtering based on criteria.
- **Custom Tooltips**: Enhance tooltips to provide more context-specific information.
- **Animations**: Add animations for smoother transitions and interactions.
- **Accessibility**: Improve accessibility features to ensure usability for all users.

## License

This project is open-source and available under the [MIT License](LICENSE).
