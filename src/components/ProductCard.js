import React from 'react';
import Button from './Button';

const ProductCard = ({ product, onAddToCart }) => {
    const cardStyle = {
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#fff',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    };

    const imageStyle = {
        width: '200px',
        height: '200px',
        objectFit: 'contain',
        marginBottom: '15px'
    };

    const titleStyle = {
        fontSize: '16px',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: '10px',
        height: '48px',
        overflow: 'hidden'
    };

    const descriptionStyle = {
        fontSize: '14px',
        color: '#666',
        textAlign: 'center',
        marginBottom: '15px',
        height: '60px',
        overflow: 'hidden'
    };

    const priceStyle = {
        fontSize: '18px',
        color: '#0088ff',
        fontWeight: 'bold',
        marginBottom: '15px'
    };
    const salvarProdutoNoBanco = async (produto) => {
        try {
            const response = await fetch("http://localhost:8000/produtos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    nome: produto.title,
                    descricao: produto.description,
                    preco: produto.price,
                    imagem: produto.image,
                }),
            });
    
            if (!response.ok) {
                throw new Error("Erro ao salvar produto no backend");
            }
    
            const data = await response.json();
            console.log("Produto salvo no backend:", data);
        } catch (error) {
            console.error("Erro ao enviar produto:", error);
        }
    };
    

    return (
        <div style={cardStyle}>
            <img 
                src={product.image} 
                alt={product.title} 
                style={imageStyle}
            />
            <h3 style={titleStyle}>{product.title}</h3>
            <p style={descriptionStyle}>{product.description}</p>
            <p style={priceStyle}>R$ {product.price.toFixed(2)}</p>
            <Button onClick={() => {
    onAddToCart(product);
    salvarProdutoNoBanco(product);
}}>
    Adicionar ao Carrinho
</Button>
        </div>
    );
};

export default ProductCard;