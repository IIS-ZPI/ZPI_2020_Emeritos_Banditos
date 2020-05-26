package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.List;

@RestController
@SpringBootApplication
@RequestMapping("/rest-services")
public class DemoApplication {
	@Autowired
	StateRepo stateRepo;

	@RequestMapping("/")
	public String home(HttpSession session){
		return "test";
	}

	@RequestMapping("/Product")
	public List<Product> getPrice(Product product, HttpSession session){
		//product = new Product(1,"bluza","clothing","California",200,250,225,25);
		State state = stateRepo.findByName(product.getState());
		double margin=state.getMap().get(product.getCategory());

		if(margin==0){
			product.setSellprice(product.getClientprice());
		}else{
			product.setSellprice(product.getClientprice() * (1 - margin / 100));
		}
		product.setMargin(product.getSellprice() - product.getNetto());

		List<Product> productList=getProducts(session);
		productList.add(product);
		session.setAttribute("ProductList",productList);
		return productList;
	}


	@RequestMapping("/ProductList")
	public List<Product> getProducts(HttpSession session){
		return getProductList(session);
	}

	@RequestMapping("/States")
	public List<String> getStatesList(){
		List<State>stateList = stateRepo.findAll();
		List<String>returnList = new ArrayList<>();
		for(State state:stateList){
			returnList.add(state.getName());
		}
		return returnList;
	}


	private List<Product> getProductList(HttpSession session) {
		List<Product> productList = (List<Product>) session
				.getAttribute("ProductList");

		if (productList == null) {
			productList = new ArrayList<>();
		}
		return productList;
	}


	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}

}
