import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Tabla from "../components/Tabla";
import { useEffect, useState } from "react";
import { apiUrl } from "../config";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteForEverIcon from "@mui/icons-material/DeleteForever";
import { useNavigate } from "react-router";

function ProductList() {
  const [rows, setRows] = useState([]);
  const navigate = useNavigate();

  const columns = [
    { field: "id_product", header: "ID", align: "right" },
    { field: "product_name", header: "Nombre" },
    { field: "price", header: "Precio", render: (row) => `${row.price} €` },
    {
      field: "category",
      header: "Categoría",
      render: (row) => row.idcategory_category.category_name,
    },
    {
      field: "in_stock",
      header: "Stock",
      render: (row) => (row.in_stock ? "Sí" : "No"),
    },
    { field: "registration_date", header: "Fecha de registro" },
  ];

  const actions = [
    {
      icon: <EditNoteIcon fontSize="small" />,
      onClick: (row) => navigate("/modificarProducto/" + row.id_product),
    },
    {
      icon: <DeleteForEverIcon fontSize="small" />,
      color: "error",
      onClick: (row) => handleDelete(row.id_product),
    },
  ];

  useEffect(() => {
    async function getProduct() {
      const response = await fetch(apiUrl + "/product");

      if (response.ok) {
        let data = await response.json();
        setRows(data.datos);
      }
    }

    getProduct();
  }, []);

  const handleDelete = async (id_product) => {
    if (confirm("Seguro que quieres borrar este producto")) {
      let response = await fetch(apiUrl + "/product/" + id_product, {
        method: "DELETE",
      });

      if (response.ok) {
        const productosRestantes = rows.filter(
          (producto) => producto.id_product != id_product,
        );
        setRows(productosRestantes);
      }
    }
  };

  const [nombre, setNombre]= useState("");

  const handleChange = (e) => {

    setNombre(e.target.value);
  };

    const handleSubmit = async (e) => {
      // No hacemos submit
      e.preventDefault();
  
      // Enviamos los datos mediante fetch
      try {
        let url="/product"
        if(nombre!=""){

          url+="/parametrizado/"+nombre

        }

        const response = await fetch(apiUrl+url);
  
        if (response.ok) {
          const respuesta = await response.json();
          if (respuesta.ok) {
            setRows(respuesta.datos)
          }
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Error:", error);
      }
    };

  return (
    <Box id="pdf-Content">
      <Typography variant="h4" align="center" sx={{ mt: 2 }}>
        Lista de productos
      </Typography>
      <Grid
        container
        spacing={2}
        sx={{ mt: 2, justifyContent: "center", alignItems: "right" }}
      >
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Stack
            component="form"
            spacing={2}
            onSubmit={handleSubmit}
            sx={{ mx: 2 }}
          >
            <TextField
              id="nombre"
              label="Nombre del producto"
              variant="outlined"
              name="nombre"
              value={nombre}
              onChange={handleChange}
            />
            <Button variant="contained" type="submit">
              Buscar
            </Button>
          </Stack>
        </Grid>
      </Grid>
      <Tabla
        columns={columns}
        rows={rows.map((r) => ({ ...r, id: r.id_product }))}
        actions={actions}
      />
    </Box>
  );
}

export default ProductList;
