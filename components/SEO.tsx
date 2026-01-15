import React, { useEffect } from 'react';
import { SchemaData } from '../types';

interface SEOProps {
  title: string;
  description: string;
  schema?: SchemaData;
}

const SEO: React.FC<SEOProps> = ({ title, description, schema }) => {
  useEffect(() => {
    document.title = `${title} | LastikBasınç Rehberi`;
    
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', description);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = description;
      document.head.appendChild(meta);
    }
  }, [title, description]);

  useEffect(() => {
    if (!schema) return;

    const scriptId = 'json-ld-schema';
    let script = document.getElementById(scriptId) as HTMLScriptElement;

    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }

    // Format schema based on type
    let schemaContent = {};
    if (schema.type === 'Product') {
      schemaContent = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": schema.data.name,
        "description": schema.data.description,
        "brand": {
          "@type": "Brand",
          "name": schema.data.make
        },
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "TRY",
          "availability": "https://schema.org/InStock"
        }
      };
    } else if (schema.type === 'Article') {
      schemaContent = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": schema.data.title,
        "articleBody": schema.data.content,
        "datePublished": schema.data.date
      };
    }

    script.text = JSON.stringify(schemaContent);

    return () => {
      // Optional: Clean up script on unmount if needed, but usually keeping it is fine until next page load
    };
  }, [schema]);

  return null;
};

export default SEO;