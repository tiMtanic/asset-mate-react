import React from 'react'
import AddEditStockForm from '../components/AddEditStockForm'
import { useParams } from 'react-router-dom'

function AddEditStockPage() {
  const {stockId} = useParams();

  return (
    <>
      <h1>{stockId ? "Edit": "Add"} Stock</h1>
      <AddEditStockForm />
    </>
  )
}

export default AddEditStockPage