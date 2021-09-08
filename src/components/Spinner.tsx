import React from 'react';

export const Spinner = (): JSX.Element => {
    return (
        <div className="Spinner">
            <div className="d-flex justify-content-center">
                <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        </div>
    );
};