
import React, { useEffect, useState } from "react";
import initialPositions from "./initial_positions (1).json";
import updatedPositions from "./updated_positions (1).json";

const ZonesData = [
  {
    label: "Zone 1",
    color: "#c2fcff",
    coordinates: { top: "10%", left: "10%" },
    radius: 100,
  },
  {
    label: "Zone 2",
    color: "#fcf7c0",
    coordinates: { top: "20%", left: "30%" },
    radius: 100,
  },
  {
    label: "Zone 3",
    color: "#d9dcff",
    coordinates: { top: "20%", left: "50%" },
    radius: 100,
  },
  {
    label: "Zone 4",
    color: "#f8c5bd",
    coordinates: { top: "30%", left: "70%" },
    radius: 100,
  },
];

const App = () => {
  const [employees, setEmployees] = useState(initialPositions);

  useEffect(() => {
    const updatePositions = () => {
      setTimeout(() => {
        setEmployees(updatedPositions);
      }, 5000);
    };

    updatePositions();
  }, []);

  const getEmployeePosition = (zone, index) => {
    const basePositions = {
      "Zone 1": { top: "15%", left: "15%" },
      "Zone 2": { top: "25%", left: "35%" },
      "Zone 3": { top: "25%", left: "55%" },
      "Zone 4": { top: "35%", left: "75%" },
    };

    const basePosition = basePositions[zone] || { top: "0%", left: "0%" };

    const offset = 40;
    return {
      top: `calc(${basePosition.top} + ${Math.floor(index / 3) * offset}px)`,
      left: `calc(${basePosition .left} + ${(index % 3) * offset}px)`,
    };
  };

  return (
    <div
      style={{
        position: "relative",
        height: "100vh",
        backgroundColor: "#f0f0f0",
        overflow: "hidden",
      }}
    >
      {ZonesData.map((zone, index) => (
        <div
          key={index}
          style={{
            backgroundColor: zone.color,
            top: zone.coordinates.top,
            left: zone.coordinates.left,
            position: "absolute",
            width: `${zone.radius * 2}px`,
            height: `${zone.radius * 2}px`,
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          {zone.label}
        </div>
      ))}
      {employees.map((employee, index) => {
        const position = getEmployeePosition(employee.zone, index);
        return (
          <div
            key={employee._id}
            style={{
              position: "absolute",
              top: position.top,
              left: position.left,
              backgroundColor: "#4caf50",
              color: "#fff",
              borderRadius: "50%",
              width: "30px",
              height: "30px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontWeight: "bold",
              cursor: "pointer",
              boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
              transition: "transform 0.3s",
            }}
            title={`${employee.firstName} ${employee.lastName} ${employee.zone} `}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            {employee.firstName.charAt(0)}
            {employee.lastName.charAt(0)}
          </div>
        );
      })}
    </div>
  );
};

export default App;

