import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {createProduct,deleteProductById, getProduct,getProductById,getProductBySellerId,getProductBySearch,getProductByCategory,updateProductById} from "../api/productService";
import {toast} from "react-toastify";

export const addProduct =
    createAsyncThunk('product/addProduct',async (body)=>{
        return  createProduct(body.token,body
        ).then((res) =>{
            return res.data
        }).catch((err) =>{
            return err.response.data
        })
    })

export const fetchProduct =
    createAsyncThunk('product/fetchProduct',async (body)=>{
        return  getProduct(
            body.token
        ).then((res) =>{
            return res.data
        }).catch((err) =>{
            return err.response.data
        })
    })

    export const fetchProductById =
    createAsyncThunk('product/fetchProductById',async (body)=>{
        console.log("from slice")
        console.log(body)
        return  getProductById(
            body.token,
            body.productId
        ).then((res) =>{
            return res.data
        }).catch((err) =>{
            return err.response.data
        })
    })

    export const deleteProduct =
    createAsyncThunk('product/deleteProduct',async (body)=>{
        return  deleteProductById(
            body.token,
            body.productId
        ).then((res) =>{
            return res.data
        }).catch((err) =>{
            return err.response.data
        })
    })

    export const getSellerProducts =
    createAsyncThunk('product/getSellerProducts',async (body)=>{
        return  getProductBySellerId(
            body.token
        ).then((res) =>{
            return res.data
        }).catch((err) =>{
            return err.response.data
        })
    })

    export const fetchProductByQuery =
        createAsyncThunk('product/fetchProductByQuery', async (body) => {
            return getProductBySearch(
                body.token,
                body.query
            ).then((res) => {
                return res.data
            }).catch((err) => {
                return err.response.data
            })
        })

    export const fetchProductByCategory =
        createAsyncThunk('product/fetchProductByCategory', async (body) => {
            return getProductByCategory(
                body.token,
                body.category
            ).then((res) => {
                return res.data
            }).catch((err) => {
                return err.response.data
            })
        })

        export const updateProduct = createAsyncThunk(
            'product/updateProduct',
            async ({ token, productId, updatedProduct }) => {
              try {
                const response = await updateProductById(token, productId, updatedProduct);
                return response.data;
              } catch (error) {
                throw error;
              }
            }
        );



const productSlice = createSlice({
    name: "product", initialState: {
        addProductInProcess:false,
        fetchProductInProcess:false,
        fetchSellerProductInProcess:false,
        allProductList: [],
        sellerProductsList:[],
        selectedProduct:'',
        productDetails:'',
        searchProductResult:[],
        categoryProductResult:[],
        selectedCategory:'',
        searchQuery:'',
    },
    reducers:{
        setSelectedProduct:(state,action) =>{
            state.selectedProduct = action.payload.productId
        },
        setSelectedCategory:(state, action) =>{
            state.selectedCategory = action.payload.category
        },
        setSearchQuery:(state, action) =>{
            state.searchQuery = action.payload.searchQuery
        }
    },
    extraReducers:{
        [addProduct.pending]:(state) => {
            state.addProductInProcess = true
            console.log("Product Add pending")
        },
        [addProduct.fulfilled]:(state,action) =>{
            if(action.payload.message ==="success"){
                toast.success('Product Added Successfully', {
                    position: toast.POSITION.TOP_CENTER
                });
            }else {
                toast.error('Please try again!!', {
                    position: toast.POSITION.TOP_CENTER
                });
            }
            state.addProductInProcess =false
        },
        [addProduct.rejected]:(state)=>{
            state.addProductInProcess = false
            toast.error("Product Create failed", {
                position: toast.POSITION.TOP_CENTER
            });
        },
        [fetchProduct.pending]:(state) => {
            state.fetchProductInProcess = true
            console.log("pending")
        },
        [fetchProduct.fulfilled]:(state,action) =>{
            if(action.payload.message ==="success"){
                state.allProductList = action.payload.data
                console.log("Product fetched")
                console.log(state.allProductList)
            }else {
                console.log(action.payload.message)
            }
            state.fetchProductInProcess =false
        },
        [fetchProduct.rejected]:(state)=>{
            state.fetchProductInProcess = false
            console.log("Product fetch failed")
        },
        [fetchProductById.pending]:(state) => {
            state.fetchProductInProcess = true
            console.log("pending")
        },
        [fetchProductById.fulfilled]:(state,action) =>{
            if(action.payload.message ==="success"){
                state.productDetails = action.payload.data
                console.log("Product fetched")
                console.log(state.productList)
            }else {
                console.log(action.payload.message)
            }
            state.fetchProductInProcess =false
        },
        [fetchProductById.rejected]:(state)=>{
            state.fetchProductInProcess = false
            console.log("Product fetch failed")
        },
        [fetchProduct.rejected]:(state)=>{
            state.fetchProductInProcess = false
            console.log("Product fetch failed")
        },
        [deleteProduct.pending]:(state) => {
            console.log("pending")
        },
        [deleteProduct.fulfilled]:(state,action) =>{
            if(action.payload.message ==="success"){
                console.log("Product deleted")
            }else {
                console.log(action.payload)
            }
        },
        [deleteProduct.rejected]:(state)=>{
            console.log("Product fetch failed")
        },
        [getSellerProducts.pending]:(state) => {
            state.fetchSellerProductInProcess = true
            console.log("pending")
        },
        [getSellerProducts.fulfilled]:(state,action) =>{
            if(action.payload.message ==="success"){
                state.sellerProductsList = action.payload.data
                console.log("Product fetched")
                console.log(state.sellerProductsList)
            }else {
                console.log(action.payload.message)
            }
            state.fetchSellerProductInProcess =false
        },
        [getSellerProducts.rejected]:(state)=>{
            state.fetchSellerProductInProcess = false
            console.log("Product fetch failed")
        },
        [fetchProductByQuery.pending]:(state) => {
            state.fetchProductInProcess = true
            console.log("pending")
        },
        [fetchProductByQuery.fulfilled]:(state,action) =>{
            console.log("fetchProductByQuery-",action.payload.data);
            if(action.payload.message ==="success"){
                state.searchProductResult = action.payload.data
            }else {
                console.log(action.payload.message)
            }
            state.fetchProductInProcess =false
        },
        [fetchProductByQuery.rejected]:(state)=>{
            state.fetchProductInProcess = false
            console.log("Product fetch failed")
        },
        [fetchProductByCategory.pending]:(state) => {
            state.fetchProductInProcess = true
            console.log("pending")
        },
        [fetchProductByCategory.fulfilled]:(state,action) =>{
            if(action.payload.message ==="success"){
                state.categoryProductResult = action.payload.data
                console.log("Product fetched")
            }else {
                console.log(action.payload.message)
            }
            state.fetchProductInProcess =false
        },
        [fetchProductByCategory.rejected]:(state)=>{
            state.fetchProductInProcess = false
            console.log("Product fetch failed")
        },
        [updateProduct.fulfilled]: (state, action) => {
            // Assuming the response data includes the updated product details
            state.productDetails = action.payload;
        },
    }
})

export const {setSelectedProduct,setSelectedCategory,setSearchQuery} = productSlice.actions;



export const productReducer = productSlice.reducer;