package org.emeritosbanditos.backend;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.web.bind.annotation.*;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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
        if(product.getQuantity()<=0)
            product.setQuantity(1);
        productRepo.save(calculateProduct(product));
        return productRepo.findAll().stream().sorted().collect(Collectors.toList());
    }

    @GetMapping("/productList")
    public List<Product> getProducts() {
        return productRepo.findAll().stream().sorted().collect(Collectors.toList());
    }

    @PostMapping("/edit")
    public List<Product> editProduct(@RequestBody Product product){
        if(product.getQuantity()<=0)
            product.setQuantity(1);
        productRepo.save(calculateProduct(product));
        return productRepo.findAll().stream().sorted().collect(Collectors.toList());
    }

    @DeleteMapping("/delete/{id}")
    public List<Product> deleteProduct(@PathVariable("id") int id){
        productRepo.delete(productRepo.findById(id).orElseThrow(()->new RuntimeException("wrong id")));
        return productRepo.findAll().stream().sorted().collect(Collectors.toList());
    }


    @GetMapping("/states")
    public List<String> getStatesList() {
        List<State> stateList = stateRepo.findAll();
        List<String> returnList =
                stateList.stream()
                        .map(State::getName)
                        .sorted()
                        .collect(Collectors.toList());

        return returnList;
    }
    @GetMapping("/categories")
    public List<Category> getCategoriesList() {
        List<Category> returnList=new ArrayList<>();
        int id=0;
        for(Field f:State.class.getDeclaredFields()){
            if(!f.getName().equals("name") && !f.getName().contains("exempt")){
                returnList.add(new Category(id++,f.getName()));
            }
        }
        return returnList;
    }

    private Product calculateProduct(Product product){
        State state = stateRepo.findByName(product.getState());
        double tax = state.getMap().get(product.getCategory());
        String exemptName=product.getCategory()+"_exempt";
        Optional<Double> exempt=Optional.ofNullable(state.getMap().get(exemptName));

        product.setNetto(product.getNetto()*product.getQuantity());
        product.setClientprice(product.getClientprice()*product.getQuantity());

        if(product.getClientprice()<exempt.orElse((double) 0)){
            tax=0;
        }

        if (tax == 0) {
            product.setSellprice(product.getClientprice());
        } else {
            product.setSellprice(Math.round(product.getClientprice() /(1+tax / 100)*100.0)/100.0);
        }

        product.setMargin(Math.round((product.getSellprice() - product.getNetto())*100)/100.0);
        return product;
    }

}