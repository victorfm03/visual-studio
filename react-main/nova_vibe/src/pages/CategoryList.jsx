import { Box, Stack, Typography,TextField, Button } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Tabla from "../components/Tabla";
import { useEffect, useState } from "react";
import { apiUrl } from "../config";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteForEverIcon from "@mui/icons-material/DeleteForever";
import { useNavigate } from "react-router";

function CategoryList() {

  const [rows, setRows] = useState([]);
  const navigate = useNavigate();

  const columns = [
    { field: "id_category", header: "ID", align: "right" },
    { field: "category_name", header: "Nombre" },
    { field: "description", header: "descripcion" },
    {
      field: "like_count",
      header: "Popularidad",
      render: (row) => `${row.like_count}`,
    },
    {
      field: "seasonal_product_available",
      header: "PDT",
      render: (row) => (row.seasonal_product_available ? "Sí" : "No"),
    },
    { field: "creation_date", header: "Fecha de creacion" },
  ];

  const actions = [
    {
      icon: <EditNoteIcon fontSize="small" />,
      onClick: (row) => navigate("/modificarCategoria/" + row.id_category),
    },
    {
      icon: <DeleteForEverIcon fontSize="small" />,
      color: "error",
      onClick: (row) => handleDelete(row.id_category)
    },
  ];

  useEffect(() => {
    async function getcategory() {
      let response = await fetch(apiUrl + "/category");

      if (response.ok) {
        let data = await response.json();
        setRows(data.datos);
      }
    }

    getcategory();
  }, []);

  const handleDelete = async (id_category) => {
    if (confirm("Seguro que quieres borrar este categoria")) {
      let response = await fetch(apiUrl + "/category/" + id_category, {
        method: "DELETE",
      });

      if (response.ok) {
        const categoriasRestantes = rows.filter(
          (category) => category.id_category != id_category
        );
        setRows(categoriasRestantes);
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
        let url="/category"
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
          <Typography variant="h4" align="center" sx={{mt: 2}}>
            Lista de categorias
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
                        label="Nombre de categoria"
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
          <Tabla columns={columns} rows={rows.map((r) => ({...r, id: r.id_category}))} actions={actions} />
      </Box>
  );
}

export default CategoryList;
