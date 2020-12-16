import React from 'react';
import { FooterBase } from "./styles";

function Footer() {
    return (
        <FooterBase className="col-12 text-center bg-dark">
            <div className="py-4">
                <a href="https://www.instagram.com/nettuf" target="_blank" rel="noopener noreferrer">Netto Fernandes</a>
                <p>Baseado nos conteúdos da Imersão React Alura</p>
            </div>
        </FooterBase>
    );
}

export default Footer;