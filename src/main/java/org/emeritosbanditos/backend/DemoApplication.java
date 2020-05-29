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
        Product p= calculateProduct(product);

        List<Product> productList = getProducts(session);
        if(productList.isEmpty()){
            p.setId(0);
        }else{
            p.setId(productList.get(productList.size()-1).getId()+1);
        }
        productList.add(p);
        session.setAttribute("ProductList", productList);
        return productList;
    }

    @GetMapping("/productList")
    public List<Product> getProducts(HttpSession session) {
        return getProductList(session);
    }

    @PostMapping("/edit")
    public void editProduct(@RequestBody Product product,HttpSession session){
        List<Product> productList= getProductList(session);
        Product productToEdit=productList.stream()
                .filter(p->p.getId()==product.getId())
                .findAny()
                .orElseThrow(()->new RuntimeException("wrong id"));
        productList.set(productList.indexOf(productToEdit), calculateProduct(product));
        session.setAttribute("ProductList", productList);
    }

    @DeleteMapping("/delete/{id}")
    public List<Product> deleteProduct(@PathVariable("id") int id,HttpSession session){
        List<Product> productList= getProductList(session);
        Product productToDelete=productList.stream()
                .filter(p->p.getId()==id)
                .findAny()
                .orElseThrow(()->new RuntimeException("wrong id"));
        productList.remove(productToDelete);
        session.setAttribute("ProductList", productList);
        return productList;
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

    private List<Product> getProductList(HttpSession session) {
        List<Product> productList = (List<Product>) session.getAttribute("ProductList");

        if (productList == null) {
            productList = new ArrayList<>();
        }
        return productList;
    }

}