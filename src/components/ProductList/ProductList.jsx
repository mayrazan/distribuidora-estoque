import { useEffect, useState } from "react";
import { getDataApi, getScore } from "../../services/getDataApi";
import Loading from "../Loading";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
//import FavoriteOutlinedIcon from "@material-ui/icons/FavoriteOutlined";
import StarBorderOutlinedIcon from "@material-ui/icons/StarBorderOutlined";
import "./ProductList.scss";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    marginBottom: 30,
    textAlign: "center",
  },
  button: {
    justifyContent: "center",
  },
});

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [score, setScore] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    (async () => {
      const response = await getDataApi("products");
      setProducts(response);
      setTimeout(() => setLoading(false), 700);
    })();
  }, []);

  function incrementScore(id) {
      
    const product = products.filter((el)=>{
        return el.id === id
    })

    const e = product.map((el)=>{
        setScore(el.score + 1)
        return el
    })
     const data = getScore(id, score)
     console.log(score)

     return data
  }

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="container-products">
          {products.map((product) => {
            return (
              <Card className={classes.root} key={product.id}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    alt="Produto"
                    height="300"
                    image={product.image}
                    title="Products"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {product.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {product.description}
                    </Typography>
                    <FavoriteBorderOutlinedIcon />
                  </CardContent>
                </CardActionArea>
                <CardActions className={classes.button}>
                  <Button
                    size="small"
                    variant="contained"
                    color="primary"
                    onClick={()=>incrementScore(product.id)}
                  >
                    Incrementar Pontuação
                  </Button>
                  <Typography variant="h5" color="textPrimary" component="h4">
                    {product.score}
                    <StarBorderOutlinedIcon />
                  </Typography>
                </CardActions>
              </Card>
            );
          })}
        </div>
      )}
    </>
  );
}
