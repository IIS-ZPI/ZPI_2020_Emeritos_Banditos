package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@SpringBootApplication
public class DemoApplication {
	@Autowired
	ProductRepo productRepo;

	@Autowired
	StateRepo stateRepo;



	@RequestMapping("/")
	public String home(){
		return "test";
	}

	@RequestMapping("/Product")
	public Product getPrice(Product product){
		//product = new Product(1,"bluza","clothing","California",200,250,225,25);
		State state = stateRepo.findByName(product.getState()).get(0);
		double margin=state.getMap().get(product.getCategory());

		if(margin==0){
			product.setSellprice(product.getClientprice());
		}else{
			product.setSellprice(product.getClientprice() * (1 - margin / 100));
		}
		product.setMargin(product.getSellprice() - product.getNetto());
		productRepo.save(product);
		return product;
	}

	@RequestMapping("ProductList")
	public List<Product> getProducts(){
		return productRepo.findAll();
	}




	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}

}
