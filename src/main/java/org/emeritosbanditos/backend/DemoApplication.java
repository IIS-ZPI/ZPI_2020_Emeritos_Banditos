package org.emeritosbanditos.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.web.bind.annotation.*;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;

@RestController
@SpringBootApplication
@RequestMapping("/rest-services")
public class DemoApplication extends SpringBootServletInitializer {
    @Autowired
    StateRepo stateRepo;

    @Autowired
    ProductRepo productRepo;

    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }

    @PostMapping("/product")
    public List<Product> getPrice(@RequestBody Product product) {
        productRepo.save(calculateProduct(product));
        return productRepo.findAll();
    }

    @GetMapping("/productList")
    public List<Product> getProducts() {
        return productRepo.findAll();
    }

    @PostMapping("/edit")
    public void editProduct(@RequestBody Product product){
        productRepo.save(calculateProduct(product));
    }

    @DeleteMapping("/delete/{id}")
    public List<Product> deleteProduct(@PathVariable("id") int id){
        productRepo.delete(productRepo.findById(id).orElseThrow(()->new RuntimeException("wrong id")));
        return productRepo.findAll();
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
    public List<Category> getCategoriesList() {
        List<Category> returnList=new ArrayList<>();
        int id=0;
        for(Field f:State.class.getDeclaredFields()){
            if(!f.getName().equals("name")){
                returnList.add(new Category(id++,f.getName()));
            }
        }
        return returnList;
    }

    private Product calculateProduct(Product product){
        State state = stateRepo.findByName(product.getState());
        double margin = state.getMap().get(product.getCategory());

        if (margin == 0) {
            product.setSellprice(product.getClientprice());
        } else {
            product.setSellprice(product.getClientprice() * (1 - margin / 100));
        }
        product.setMargin(product.getSellprice() - product.getNetto());
        return product;
    }


}