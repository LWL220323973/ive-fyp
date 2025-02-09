import React, { useState, useEffect } from "react";
import axios from "axios";

const baseURL = "http://localhost:8080/api/dishesType";

// Dishes Type API call
export function getDishesType() {
  return axios.get(baseURL + "/getAllDishesType", {
    headers: {
      'Access-Control-Allow-Origin': '*',
    }
  });
}

export default function DishesTypeList() {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getDishesType()
      .then((response) => {
        setDishes(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching dishes types:", err);
        setError(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading dishes types.</div>;

  return (
    <ul>
      {dishes.map((dish) => (
        <li key={dish.id}>{dish.name}</li>
      ))}
    </ul>
  );
}