import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, Validators, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PropertyService } from 'src/app/services/property.service';

@Component({
  selector: 'app-sagit',
  templateUrl: './sagit.component.html',
  styleUrls: ['./sagit.component.scss']
})
export class SagitComponent implements OnInit {

  constructor(private sagitService: PropertyService, private fb: FormBuilder, private route: ActivatedRoute, private router: Router) { }
  sagitForm: FormGroup = this.fb.group({});
  firstStep: any;
  landStep: any;
  houseStep: any;
  imageStep: any;
  selectedImages: any[] = [];
  imgPreviewURL: any[] = [];
  propertyType: string = '';
  sagitHeaderMsg: any;
  isEditing : boolean = false;
  editedProp: any;
  fetchedProp : boolean = false;
  deletedImages : number[] = [];
  error: boolean = false;
  submitting: boolean = false;
  errorMessage: any;
  adImageURL = "./assets/images/dp_placeholder.png";

  ngOnInit(): void {
    this.route.paramMap.subscribe(param =>{
      if(param.get('edit')){
        let propEditID = param.get('edit');
        let propEditType: string|any =  param.get('type');
        this.isEditing = true;
        this.sagitService.isEditing = true;
        //get property to be edited from property service if coming from user property page
        if(this.sagitService.userProperties !== undefined){
          this.editedProp = this.sagitService.userProperties.filter((prop:any)=>{
            console.log('Filtering User properties');
            this.fetchedProp = true;
            return prop.id == propEditID;
          })[0];
          this.displayForm();
          //this.setPropertyType(this.editedProp.type);
          setTimeout(()=>{//this is to validate other prop type in setPropertyType method
            this.setPropertyType(propEditType);
          },50);
        }
        else{//fetch property from server if its a direct link to editing page
          this.sagitService.getProperties(propEditType+'/'+propEditID).subscribe(res=>{
            this.editedProp = res;
            console.log("About to log response from server");
            console.log(res);
            this.fetchedProp = true;
            this.displayForm();
            //this.setPropertyType(propEditType);
            setTimeout(()=>{
              this.setPropertyType(propEditType);
            },50);
            console.log('Got editProp from server');
            console.log(this.editedProp);
          });
        }
        console.log(this.editedProp);
        console.log(param.get('edit'));
      }
      this.sagitHeaderMsg = this.isEditing? "Editing Property" : "List and Get Deals";
    })
    if(!this.isEditing){
      this.displayForm();
    }
    //console.log(this.firstStep);
  }
  ngOnDestroy(){
    this.sagitService.isEditing = false;
  }
  displayForm(){
    console.log('logging broker fee');
    this.sagitForm = this.fb.group({
      sagitFormGroup: this.fb.array([
        this.fb.group({
          title: [
            this.fetchedProp? this.editedProp.title: '',
            [
              Validators.required,
              Validators.minLength(15),
              Validators.maxLength(55)
            ]
          ],
          dealType: [
            this.fetchedProp? this.editedProp.deal: 'For Rent',
            [
              Validators.required,
              Validators.minLength(5)
            ]
          ],
          price: [
            this.fetchedProp? this.editedProp.price: 20000,
            [
              Validators.required,
              Validators.max(10000000000),
              Validators.min(1000)
            ]
          ],
          status: [
            this.fetchedProp? this.editedProp.status: 'No Bid Yet',
            [
              Validators.required,
              Validators.minLength(5),
              Validators.maxLength(19)
            ]
          ],
          state:[
            this.fetchedProp? this.editedProp.state: 'Enugu',
            [
              Validators.required,
              Validators.minLength(3),
              Validators.maxLength(15),
            ]
          ],
          lga: [
            this.fetchedProp? this.editedProp.lga: 'Enugu South',
            [
              Validators.required,
              Validators.minLength(3),
              Validators.maxLength(15),
            ]
          ],
          town: [
            this.fetchedProp? this.editedProp.town: 'Ugwuaji',
            [
              Validators.required,
              Validators.minLength(3),
              Validators.maxLength(15),
            ]
          ],
          desc: [
            this.fetchedProp? this.editedProp.desc: 'Well built and painted in a secure environs',
            [
              Validators.minLength(3),
              Validators.maxLength(255),
            ]
          ],
          purpose: [
            this.fetchedProp? this.editedProp.purpose: 'Commercial',
            [
              Validators.required,
              Validators.minLength(3),
              Validators.maxLength(15),
            ]
          ],
          brokerFee: [
            this.fetchedProp? this.editedProp.broker_fee + '': "0",//cast to string
            [
              Validators.required
            ]
          ],
        // ... form controls for our step
        }),
        this.fb.group({
          plots: [
            this.fetchedProp && this.editedProp.type=='land'? this.editedProp.land.plots: 1,
            [
              Validators.required,
              Validators.min(1),
              Validators.max(1000)
            ]
          ],
          size: [
            this.fetchedProp && this.editedProp.type=='land'? this.editedProp.land.size.split('_')[0]: '2500',
            [
              Validators.required,
              Validators.min(50),
              Validators.max(1000000)
            ]
          ],
          unit: [
            this.fetchedProp && this.editedProp.type=='land'? this.editedProp.land.size.split('_')[1]: '',
            [
              Validators.required
            ]
          ],
          allocationType: [
            this.fetchedProp && this.editedProp.type=='land'? this.editedProp.land.allocation_type: '',
            [
              Validators.required,
              Validators.minLength(5),
              Validators.maxLength(55)
            ]
          ],

        }),
        this.fb.group({
          totalRooms: [
            this.fetchedProp && this.editedProp.type=='house' && this.editedProp.total_rooms!==undefined? this.editedProp.house.total_rooms: 1,
            [
              Validators.required,
              Validators.min(0),
              Validators.max(1000)
            ]
          ],
          bedrooms:[
            this.fetchedProp && this.editedProp.type=='house' && this.editedProp.bedrooms!==undefined? this.editedProp.house.bedrooms: 1,
            [
              //Validators.required,
              Validators.min(0),
              Validators.max(100)
            ]
          ],
          bathrooms: [
            this.fetchedProp && this.editedProp.type=='house' && this.editedProp.bathrooms!==undefined? this.editedProp.house.bathrooms: 1,
            [
              //Validators.required,
              Validators.min(0),
              Validators.max(100)
            ]
          ],
          parkingSpace: [
            this.fetchedProp && this.editedProp.type=='house' && this.editedProp.parking_space!==undefined? this.editedProp.house.parking_space.toString(): '',
            [
              Validators.required
            ]
          ],
          parkingSpaceSize: [
            this.fetchedProp && this.editedProp.type=='house' && this.editedProp.parking_space_size!==undefined? this.editedProp.house.parking_space_size: 1,
            [
              Validators.min(1),
              Validators.max(200)
            ]
          ],
          firstResident: [
            this.fetchedProp && this.editedProp.type=='house' && this.editedProp.first_resident!==undefined? this.editedProp.house.first_resident.toString(): '',
            [
              Validators.required
            ]
          ],
          furnishing: [
            this.fetchedProp && this.editedProp.type=='house' && this.editedProp.furnishing!==undefined? this.editedProp.house.furnishing: '',
            [
              //Validators.required
            ]
          ],
          housingQuality: [
            this.fetchedProp && this.editedProp.type=='house' && this.editedProp.housing_quality!==undefined? this.editedProp.house.housing_quality: '',
            [
              //Validators.required
            ]
          ],
          smoking: [
            this.fetchedProp && this.editedProp.type=='house' && this.editedProp.smoking!==undefined? this.editedProp.house.smoking.toString():'',
            [
              //Validators.required
            ]
          ],
          pets: [
            this.fetchedProp && this.editedProp.type=='house' && this.editedProp.pets!==undefined? this.editedProp.house.pets.toString():'',
            [
              //Validators.required
            ]
          ],
          parties: [
            this.fetchedProp && this.editedProp.type=='house' && this.editedProp.parties!==undefined? this.editedProp.house.parties.toString():'',
            [
              //Validators.required
            ]
          ],
          minimumRent: [
            this.fetchedProp && this.editedProp.type=='house' && this.editedProp.minimum_rent!==undefined? this.editedProp.house.minimum_rent:'',
            [
              Validators.min(1000),
              Validators.max(10000000)
            ]
          ],
          water: [
            this.fetchedProp && this.editedProp.type=='house' && this.editedProp.water!==undefined? this.editedProp.house.water:'',
            [
              Validators.required
            ]
          ],
          light: [
            this.fetchedProp && this.editedProp.type=='house' && this.editedProp.light!==undefined? this.editedProp.house.light:'',
            [
              Validators.required
            ]
          ],
          fenced: [
            this.fetchedProp && this.editedProp.type=='house' && this.editedProp.fenced!==undefined? this.editedProp.house.fenced:'',
            [
              Validators.required,
              Validators.minLength(2),
              Validators.maxLength(55)
            ]
          ],
          facilities: [
            this.fetchedProp && this.editedProp.type=='house' && this.editedProp.facilities!==undefined? this.editedProp.house.facilities:'',
            [
              Validators.minLength(5),
              Validators.maxLength(255)
            ]
          ],
          guestCapacity: [
            this.fetchedProp && this.editedProp.type=='house' && this.editedProp.guest_capacity!==undefined? this.editedProp.house.guest_capacity:'',
            [
              Validators.minLength(1)
            ]
          ],
        }),
        this.fb.group({
          images: this.fb.array([
            this.fb.control('',[Validators.required])
          ])
        })
      ])
    })
    this.sagitForm.valueChanges.subscribe(val=>{
      console.log(val);
    })
    this.firstStep = this.sagitForm.get('sagitFormGroup.0') as FormArray;
    this.landStep = this.sagitForm.get('sagitFormGroup.1') as FormArray;
    this.houseStep = this.sagitForm.get('sagitFormGroup.2') as FormArray;
    this.imageStep = this.sagitForm.get('sagitFormGroup.3') as FormArray;
  }
  get images(){
    return this.imageStep.get('images') as FormArray;
  }
  get title(){
    return this.firstStep.get('title')
  }
  get dealType(){
    return this.firstStep.get('dealType')
  }
  get price(){
    return this.firstStep.get('price')
  }
  get status(){
    return this.firstStep.get('status')
  }
  get state(){
    return this.firstStep.get('state')
  }
  get lga(){
    return this.firstStep.get('lga')
  }
  get town(){
    return this.firstStep.get('town')
  }
  get desc(){
    return this.firstStep.get('desc')
  }
  get purpose(){
    return this.firstStep.get('purpose')
  }
  get brokerFee(){
    return this.firstStep.get('brokerFee')
  }
  get plots(){
    return this.landStep.get('plots')
  }
  get size(){
    return this.landStep.get('size')
  }
  get unit(){
    return this.landStep.get('unit')
  }
  get allocationType(){
    return this.landStep.get('allocationType')
  }
  get totalRooms(){
    return this.houseStep.get('totalRooms')
  }
  get bedrooms(){
    return this.houseStep.get('bedrooms')
  }
  get bathrooms(){
    return this.houseStep.get('bathrooms')
  }
  get firstResident(){
    return this.houseStep.get('firstResident')
  }
  get parkingSpace(){
    return this.houseStep.get('parkingSpace')
  }
  get parkingSpaceSize(){
    return this.houseStep.get('parkingSpaceSize')
  }
  get furnishing(){
    return this.houseStep.get('furnishing')
  }
  get housingQuality(){
    return this.houseStep.get('housingQuality')
  }
  get smoking(){
    return this.houseStep.get('smoking')
  }
  get pets(){
    return this.houseStep.get('pets')
  }
  get parties(){
    return this.houseStep.get('parties')
  }
  get minimumRent(){
    return this.houseStep.get('minimumRent')
  }
  get water(){
    return this.houseStep.get('water')
  }
  get light(){
    return this.houseStep.get('light')
  }
  get fenced(){
    return this.houseStep.get('fenced')
  }
  get facilities(){
    return this.houseStep.get('facilities')
  }
  get guestCapacity(){
    return this.houseStep.get('guestCapacity')
  }
  setPropertyType(type: string){
    this.propertyType = type;
    if(type == "land"){
      this.houseStep.status = "VALID";
      console.log('house form is made valid now');
    }
    else if(type == "house"){
      this.landStep.status = "VALID";
    }
  }
  imgPosition(index: any){
    return ++index;
  }
  getPreviewInfo(previewObj: any){
    let loopIteration = 0;
    let imgOption1;
    for(let v in previewObj){
      if(loopIteration == 0){
        imgOption1 = previewObj[v]
      }
      loopIteration++
    }
    return imgOption1
  }
  addImages(){
    this.images.push(this.fb.control(''));
    console.log('Loging landStep values. Length is: ', Object.keys(this.landStep.controls).length);
    let anotherStep = {...this.landStep};
    delete this.landStep.controls.water;
    console.log(anotherStep.status);
    console.log('Finished Loging landStep values. Length is: ', Object.keys(this.landStep.controls).length);
  }
  removeImage(index:number,edited = false){
    if(edited){
      this.deletedImages.push(index);
      this.editedProp.property_image = this.editedProp.property_image.filter((el:any)=>{
        return el.id !== index;
      })
      alert(`Image of ID: ${index} deleted.`);
    }
    else{
      console.log(`logging house step form control group`);
      console.log(this.houseStep);
      this.images.removeAt(index)
      //console.log(`before filter and id is ${index}`)
      //console.log(this.imgPreviewURL)
      this.imgPreviewURL = this.imgPreviewURL.filter((item:object|any)=>{
        return item.controlIndex != index
      })
      this.selectedImages = this.selectedImages.filter((item:object|any)=>{
        return item.controlIndex != index
      })
      for(let item of this.imgPreviewURL){
        if(+item.controlIndex > +index){
          console.log(`this index ${item.controlIndex} is greater than deleted index ${index}`)
          item.controlIndex = +item.controlIndex - 1
        }
      }
      //console.log('after filter')
      //console.log(this.imgPreviewURL)
    }
  }//end removeImage
  onAlert(){
    alert('Preview image clicked')
  }
  onImageSelected(event:any,controlIndex:any){
    let imgPreviewObj:object|any = {}
    let selectedImgObj:(object|any)[] = []
    let targetImg = event.target.files[0]
    selectedImgObj[<any>'controlIndex'] = controlIndex;
    selectedImgObj[controlIndex] = targetImg
    this.selectedImages.push(selectedImgObj)
    var reader = new FileReader();
    reader.readAsDataURL(targetImg);
    reader.onload = (e:any)=>{
      imgPreviewObj['controlIndex'] = controlIndex;
      imgPreviewObj[controlIndex] = e.target.result;
      this.imgPreviewURL.push(imgPreviewObj);
      console.log(targetImg.name)
    }
    console.log('image selected')
    //console.log(event)
  }
  sagit(){
    this.submitting = !this.submitting; //hide the form
    this.error = false;
    let propertyForm = new FormData()
    let propertyDetails = this.sagitForm.value
    let propDetailIndex = 0;
    switch(this.propertyType){
      case "land":
      propDetailIndex = 1
      break
      case "house":
      propDetailIndex = 2
      break
      case "others":
      propDetailIndex = 3
    }
    let postData = Object.assign({},propertyDetails.sagitFormGroup[0],propertyDetails.sagitFormGroup[propDetailIndex])
    for(let key in postData){
      propertyForm.append(key, postData[key])
    }
    //attach property type
    propertyForm.append('type', this.propertyType)
    //add image files
    for(let image of this.selectedImages){
      let loopIteration = 0;
      for(let objKey in image){
        if(loopIteration == 0){
            propertyForm.append('images[]', image[objKey]);
          }
        loopIteration++
      }
    }
    if(this.isEditing){
      propertyForm.append('editedPropID', this.editedProp.id);
      if(this.deletedImages.length){
        for(let deletedImg of this.deletedImages){
          propertyForm.append('deletedImages[]', <any>deletedImg);
        }
      }//end if deletedImages
    }//end if isEditing
    //attach property type
    this.sagitService.postProperty(propertyForm).subscribe(res=>{
      this.submitting = false;
      this.router.navigate(['user']);
      console.log(res);
    },
    error =>{
    this.submitting = !this.submitting;
    this.errorMessage = error;
    this.error = true;
    console.log(error);
    });
    console.log('Listing New Property');
  }
}
