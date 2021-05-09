import React from "react";
import {
    Card,
    CardMedia,
    CardActions,
    IconButton,
    Typography,
    CardContent,
} from "@material-ui/core";
import { AddShoppingCart } from "@material-ui/icons";
import useStyle from "./styles";
const Product = ({ product,onAddToCart }) => {
    const classes = useStyle();
    return (
        <Card className={classes.root}>
            <CardMedia
                className={classes.media}
                image={product.media.source}
                title={product.name}
            />
            <CardContent>
                <div className={classes.cardContent}>
                    <Typography variant="h5" gutterBottom>
                        {product.name}
                    </Typography>
                    <Typography variant="h5">
                        {product.price.formatted_with_symbol}
                    </Typography>
                </div>
                <Typography
                    variant="body2"
                    color="textSecondary"
                    dangerouslySetInnerHTML={{ __html: product.description }}
                ></Typography>
            </CardContent>
            <CardActions disableSpacing className={classes.CardActions}>
                <IconButton aria-label="add to cart" onClick={()=>onAddToCart(product.id,1)}>
                    <AddShoppingCart />
                </IconButton>
            </CardActions>
        </Card>
    );
};

export default Product;
