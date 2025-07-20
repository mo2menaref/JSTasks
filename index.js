const express = require('express');
const app = express();
const PORT = 3000;
app.use(express.json());

let medicines = [
  { id: 1, name: "Paracetamol", price: 5.99, stock: 50 },
  { id: 2, name: "Aspirin", price: 4.50, stock: 100 },
  { id: 3, name: "Ibuprofen", price: 6.25, stock: 75 }
];

app.get('/api/medicines', (req, res) => {
  res.json(medicines);
});
app.get('/api/medicines/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const medicine = medicines.find(med => med.id === id);
  
  if (!medicine) {
    return res.status(404).json({ message: "Medicine not found" });
  }
  
  res.json(medicine);
});

app.post('/api/medicines', (req, res) => {
  const { name, price, stock } = req.body;
  
  if (!name || !price) {
    return res.status(400).json({ message: "Name and price are required" });
  }
  
  const newId = medicines.length > 0 ? Math.max(...medicines.map(m => m.id)) + 1 : 1;
  const newMedicine = {
    id: newId,
    name,
    price,
    stock: stock || 0
  };
  
  medicines.push(newMedicine);
  res.status(201).json(newMedicine);
});

app.put('/api/medicines/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { name, price, stock } = req.body;
  
  const index = medicines.findIndex(med => med.id === id);
  if (index === -1) {
    return res.status(404).json({ message: "Medicine not found" });
  }
  
  medicines[index] = {
    id,
    name: name || medicines[index].name,
    price: price || medicines[index].price,
    stock: stock !== undefined ? stock : medicines[index].stock
  };
  
  res.json(medicines[index]);
});

app.delete('/api/medicines/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = medicines.findIndex(med => med.id === id);
  
  if (index === -1) {
    return res.status(404).json({ message: "Medicine not found" });
  }
  
  const deletedMedicine = medicines[index];
  medicines = medicines.filter(med => med.id !== id);
  
  res.json({ message: "Medicine deleted", data: deletedMedicine });
});

app.listen(PORT, () => {
  console.log(`Pharmacy API running on http://localhost:${PORT}`);
});
