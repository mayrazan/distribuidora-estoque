import { useEffect, useState } from "react";
import { getDataApi, updateProduct } from "../../services/getDataApi";
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
import FavoriteOutlinedIcon from "@material-ui/icons/FavoriteOutlined";
import StarBorderOutlinedIcon from "@material-ui/icons/StarBorderOutlined";
import "./ProductList.scss";
import SelectCategory from "../SelectCategory";
import MenuItem from "@material-ui/core/MenuItem";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    marginBottom: 30,
    textAlign: "center",
  },
  button: {
    justifyContent: "center",
  },
  load: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    position: "relative",
    top: 300,
  },
  like: {
    cursor: "pointer",
  },
});

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [isLoading, setLoading] = useState(true);
  //const [like, setLike] = useState(false);
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    const loadProducts = async () => {
      const response = await getDataApi("products");

      let filteredProducts = response;
      setProducts(filteredProducts);

      if (category !== "") {
        filteredProducts = filteredProducts.filter(
          (product) => product.category === category
        );
      }
      setProducts(filteredProducts);
      setSearch(response);
      setTimeout(() => setLoading(false), 700);
    };
    loadProducts();
  }, [category]);

  async function incrementScore(id) {
    const elementIndex = products.findIndex((item) => item.id === id);
    const selectedScore = products.find((value) => {
      return value.id === id;
    });

    await updateProduct(id, { score: selectedScore.score + 1 });

    const newArray = [...products];
    newArray[elementIndex] = {
      ...newArray[elementIndex],
      score: newArray[elementIndex].score + 1,
    };

    setProducts(newArray);
  }

  async function showInterest(id) {
    const selectedProduct = products.find((value) => {
      return value.id === id;
    });

    if (selectedProduct.like === false) {
      await updateProduct(id, { like: true });
      // setLike(true);
    } else {
      await updateProduct(id, { like: false });
      // setLike(false);
    }
    const newArray = [...products];
    newArray[selectedProduct.id - 1] = {
      ...newArray[selectedProduct.id - 1],
      like: !selectedProduct.like,
    };

    setProducts(newArray);
  }

  function select() {
    const categories = [
      ...new Set(
        search.map((product) => {
          return product.category;
        })
      ),
    ];

    return (
      <SelectCategory value={category} setValue={setCategory}>
        {categories.map((product) => {
          return (
            <MenuItem key={product} value={product}>
              {product}
            </MenuItem>
          );
        })}
      </SelectCategory>
    );
  }

  return (
    <>
      {isLoading ? (
        <div className={classes.load}>
          <Loading />
        </div>
      ) : (
        <div className="container-products">
          {select()}
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
                  </CardContent>
                </CardActionArea>
                <CardActions className={classes.button}>
                  <Button
                    size="small"
                    variant="contained"
                    color="primary"
                    onClick={() => incrementScore(product.id)}
                  >
                    Incrementar Pontuação
                  </Button>
                  <Typography variant="h5" color="textPrimary" component="h4">
                    {product.score}
                    <StarBorderOutlinedIcon />
                  </Typography>

                  <Typography
                    onClick={() => showInterest(product.id)}
                    className={classes.like}
                  >
                    {product.like === false ? (
                      <FavoriteBorderOutlinedIcon />
                    ) : (
                      <FavoriteOutlinedIcon />
                    )}
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
