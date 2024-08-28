const music = document.getElementById('background-music');
            const playButton = document.getElementById('music-play');
            const progressContainer = document.getElementById('progress-container');
            const progressBar = document.getElementById('progress-bar');

            playButton.addEventListener('click', () => {
                if (music.paused) {
                    music.play();
                    playButton.style.display = 'none'; // Oculta el botón
                    progressContainer.style.display = 'block'; // Muestra la barra de progreso

                    // Actualiza la barra de progreso mientras se reproduce el audio
                    music.addEventListener('timeupdate', () => {
                        const progress = (music.currentTime / music.duration) * 100;
                        progressBar.style.width = `${progress}%`;
                    });

                    // Oculta la barra de progreso y muestra el botón cuando el audio se detiene
                    music.addEventListener('ended', () => {
                        progressContainer.style.display = 'none';
                        playButton.style.display = 'block';
                        progressBar.style.width = '0%'; // Restablece la barra de progreso
                    });
                }
            });

            // Permite al usuario hacer clic en la barra de progreso para cambiar la posición
            progressContainer.addEventListener('click', (event) => {
                const offsetX = event.clientX - progressContainer.getBoundingClientRect().left;
                const containerWidth = progressContainer.offsetWidth;
                const newTime = (offsetX / containerWidth) * music.duration;
                music.currentTime = newTime;
            });