import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService } from '../hero.service';
import { Description, Hero, Name, Price, Stock } from '../hero';
@Component({
  selector: 'app-managerproductdetails',
  templateUrl: './managerproductdetails.component.html',
  styleUrls: ['./managerproductdetails.component.css']
})
export class ManagerproductdetailsComponent implements OnInit {
  productid:number=0;
  product!:Hero;
  selectedOption!: string;
  newname:Name = {
    name:''
  };
  newdesc:Description= {
    description:''
  };;
  newprice:Price= {
    price:''
  };;
  newstock:Stock= {
    stock:0
  };;
  constructor( private route: ActivatedRoute,
    private heroService: HeroService,   private location: Location) { }

  ngOnInit(): void {
    this.productid = Number(this.route.snapshot.paramMap.get('id'));
    this.getProduct();
  }
  getProduct(){
    this.heroService.getHero(this.productid).subscribe(hero =>{ this.product = hero;
      console.log(hero);
    })
  }
  updateProduct(stockval:string,priceval:string,descval:string,nameval:string){
   
    
    let stockchanged = false;
    let pricechanged = false;
    let descchanged = false;
    let namechanged = false;
    if(parseInt(stockval)!=this.product.stock)
      stockchanged = true;

    if(priceval != this.product.price)
      pricechanged = true;

    if(descval != this.product.description)
      descchanged = true;

    if(nameval != this.product.name)
      namechanged = true;

    if(stockchanged){
      this.newstock.stock = parseInt(stockval)
      this.heroService.updateHeroStock(this.newstock,this.productid);
    }
    if(pricechanged){
      this.newprice.price =priceval;
      this.heroService.updateHeroPrice(this.newprice,this.productid);
    }
    if(descchanged){
      this.newdesc.description = descval;
      this.heroService.updateHeroDesc(this.newdesc,this.productid);
    }
    if(namechanged){
      this.newname.name = nameval;
      this.heroService.updateHeroName(this.newname,this.productid);
    }
  }

}
