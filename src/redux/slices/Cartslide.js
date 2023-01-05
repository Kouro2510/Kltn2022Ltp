import {createSlice} from "@reduxjs/toolkit";

const initialState={
    cartItem:[],
    totalAmount:0,
    totalQuatity:0
}

const cartSlice =createSlice(
    {
        name:"cart",
        initialState,
        reducers:{
            addItem:(state,action)=>{
                const newItem=action.payload;
                const existingItem=state.cartItem.find(
                    (item)=>item.id === newItem.id
                );
                state.totalQuatity++
                if(!existingItem){
                    state.cartItem.push({
                        id:newItem.id,
                        productName:newItem.productName,
                        image:newItem.image,
                        price:newItem.price,
                        quality:1,
                        totalPrice:newItem.totalPrice,
                    })
                }
                else {
                    existingItem.quality++
                    existingItem.totalPrice=Number(existingItem.totalPrice)+Number(newItem.price)
                }
                state.totalAmount=state.cartItem.reduce((total,item)=>total+Number(item.price)*Number(item.quality));

            },
            deleteItem:(state,action)=>{
                const id=action.payload
                const existingItem=state.cartItem.find(item=>item.id===id)
                if(existingItem){
                    state.cartItem=state.cartItem.filter(item=> item.id !==id)
                    state.totalQuatity=state.totalQuatity-existingItem.quality
                    state.totalAmount=state.cartItem.reduce((total,item)=>total+Number(item.price)*Number(item.quality));
                    console.log(state.totalQuatity);
                    console.log(state.cartItem);
                }
            }
        },

    }
)
export const cartActions=cartSlice.actions;
export default cartSlice.reducer