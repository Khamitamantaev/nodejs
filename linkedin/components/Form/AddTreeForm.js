import React from 'react';
import { useFormik } from 'formik';

export const AddForm = () => {
  // Pass the useFormik() hook initial form values and a submit function that will
  // be called when the form is submitted


  const onSubmitTree = (values) => {
    fetch('/api/tree', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: values.treename})
    })
}

  const formik = useFormik({
    initialValues: {
        treename: '',
    },
    onSubmit: onSubmitTree,
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="treename">Tree Name</label>
      <input
        id="treename"
        name="treename"
        type="treename"
        onChange={formik.handleChange}
        value={formik.values.treename}
      />

      <button type="submit">Submit</button>
    </form>
  );
};


