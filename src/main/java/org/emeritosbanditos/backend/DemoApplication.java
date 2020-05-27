package org.emeritosbanditos.backend;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;

@RestController
@SpringBootApplication
@RequestMapping("/rest-services")
public class DemoApplication extends SpringBootServletInitializer {
    @Autowired
    StateRepo stateRepo;

    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }

    @PostMapping("/product")
    public List<Product> getPrice(@RequestBody Product product, HttpSession session) {
        State state = stateRepo.findByName(product.getState());
        double margin = state.getMap().get(product.getCategory());

        if (margin == 0) {
            product.setSellprice(product.getClientprice());
        } else {
            product.setSellprice(product.getClientprice() * (1 - margin / 100));
        }
        product.setMargin(product.getSellprice() - product.getNetto());

        List<Product> productList = getProducts(session);
        productList.add(product);
        session.setAttribute("ProductList", productList);
        return productList;
    }

    @GetMapping("/productList")
    public List<Product> getProducts(HttpSession session) {
        return getProductList(session);
    }

    @GetMapping("/states")
    public List<String> getStatesList() {
        List<State> stateList = stateRepo.findAll();
        List<String> returnList = new ArrayList<>();
        for (State state : stateList) {
            returnList.add(state.getName());
        }
        return returnList;
    }

    @GetMapping("/categories")
    public List<String> getCategoriesList() {
        List<String> returnList=new ArrayList<>();
        for(Field f:State.class.getDeclaredFields()){
            if(!f.getName().equals("name")){
                returnList.add(f.getName());
            }
        }
        return returnList;
    }

    private List<Product> getProductList(HttpSession session) {
        List<Product> productList = (List<Product>) session.getAttribute("ProductList");

        if (productList == null) {
            productList = new ArrayList<>();
        }
        return productList;
    }

}
