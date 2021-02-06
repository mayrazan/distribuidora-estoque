import { useEffect, useState } from "react";
import { getDataApi } from "../../services/getDataApi";
import Loading from "../Loading";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import "./ContactList.scss";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    marginBottom: 30,
    textAlign: "center",
  },
  load: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    position: "relative",
    top: 300,
  },
});

export default function ContactList() {
  const [products, setProducts] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const classes = useStyles();

  useEffect(() => {
    const loadProducts = async () => {
      const response = await getDataApi("contact");
      setProducts(response);
      setTimeout(() => setLoading(false), 700);
    };
    loadProducts();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className={classes.load}>
          <Loading />
        </div>
      ) : (
        <>
          <div className="container-title">
            <Typography gutterBottom variant="h5" component="h2">
              Lista de Sugestões
            </Typography>
          </div>
          <div className="container-products">
            {products.map((product) => {
              return (
                <Card className={classes.root} key={product.id}>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      Nome: {product.name}
                    </Typography>
                    <Typography
                      variant="h6"
                      color="textSecondary"
                      component="p"
                    >
                      Mercado: {product.supermarket}
                    </Typography>

                    <Typography variant="h6" color="textPrimary" component="h5">
                      Sugestão: {product.textField}
                    </Typography>
                    
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </>
      )}
    </>
  );
}
