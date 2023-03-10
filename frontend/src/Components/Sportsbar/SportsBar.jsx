import React from "react";
import styles from "./sportsbar.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchGoods } from "../../features/goodsSlice";
import { useEffect } from "react";
import Flip from "react-reveal/Flip";
import Card from "@mui/material/Card";
import Fade from "react-reveal/Fade";
import {
  Button,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

const SportsBar = () => {
  const dispatch = useDispatch();

  const goods = useSelector((state) => state.goods.goods);
  console.log(goods);

  useEffect(() => {
    dispatch(fetchGoods());
  }, [dispatch]);

  return (
    <div className={styles.main_unit}>
      <Flip bottom>
        <h1 className={styles.h1}>Спорт Бар</h1>
      </Flip>
      <div className={styles.main_content}>
        {goods.map((item) => {
          return (
            <Fade key={item._id} bottom cascade>
              <Card
                className={styles.card_item}
                sx={{ maxWidth: 350, height: "95%", minWidth: 350 }}
                key={item._id}
              >
                <div className={styles.img}>
                  <CardMedia
                    component="img"
                    sx={{ height: 230 }}
                    image={`assets/images/sportsNutrition/${item.image}`}
                    alt="imag"
                  />
                </div>

                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {item.name}
                  </Typography>
                  <Typography variant="body" color="#ff6f3c">
                    Цена:{item.price}
                  </Typography>
                </CardContent>
                  <Button size="small">Узнать больше</Button>
              </Card>
            </Fade>
          );
        })}
      </div>
    </div>
  );
};

export default SportsBar;
